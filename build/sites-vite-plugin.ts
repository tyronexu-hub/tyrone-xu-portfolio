import { access, cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Plugin } from "vite";

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

// Packages Sites metadata and migrations after Vite finishes compiling.
export function sites(): Plugin {
  let root = process.cwd();

  return {
    name: "sites",
    apply: "build",
    configResolved(config) {
      root = config.root;
    },
    async closeBundle() {
      const outputDirectory = resolve(root, "dist", ".openai");
      const serverDirectory = resolve(root, "dist", "server");
      const hostingConfig = resolve(root, ".openai", "hosting.json");
      const drizzleSource = resolve(root, "drizzle");

      await rm(outputDirectory, { recursive: true, force: true });
      await mkdir(outputDirectory, { recursive: true });
      await mkdir(serverDirectory, { recursive: true });
      await writeFile(
        resolve(serverDirectory, "index.js"),
        `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const assetUrl = new URL(request.url);
    assetUrl.pathname = "/dist" + (url.pathname === "/" ? "/index.html" : url.pathname);
    const assetRequest = new Request(assetUrl.toString(), { method: "GET", headers: request.headers });
    const response = await env.ASSETS.fetch(assetRequest);
    if (response.status !== 404) return response;

    if (!url.pathname.includes(".")) {
      const indexUrl = new URL(request.url);
      indexUrl.pathname = "/dist/index.html";
      indexUrl.search = "";
      const indexResponse = await env.ASSETS.fetch(new Request(indexUrl.toString(), { method: "GET" }));
      if (indexResponse.status === 404) {
        return new Response("Missing index.html", { status: 500 });
      }
      return new Response(indexResponse.body, {
        status: 200,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=0, must-revalidate"
        }
      });
    }

    return response;
  }
};
`,
      );

      if (await exists(hostingConfig)) {
        await cp(hostingConfig, resolve(outputDirectory, "hosting.json"));
      }
      if (await exists(drizzleSource)) {
        await cp(drizzleSource, resolve(outputDirectory, "drizzle"), {
          recursive: true,
        });
      }
    },
  };
}
