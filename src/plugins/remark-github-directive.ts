import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import { fetchOpenGraph, type OpenGraphData } from "../utils/fetchOpenGraph";

interface DirectiveNode {
  type: "textDirective" | "leafDirective" | "containerDirective";
  name: string;
  attributes?: Record<string, string>;
  data?: {
    hName?: string;
    hProperties?: Record<string, unknown>;
  };
}

const ogCache = new Map<string, OpenGraphData>();

const parseDirectives: Plugin<[], Root> = () => {
  return async tree => {
    const websiteNodes: Array<{
      node: DirectiveNode;
      url: string;
    }> = [];

    visit(tree, node => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        const directiveNode = node as unknown as DirectiveNode;
        const data = directiveNode.data || (directiveNode.data = {});

        if (directiveNode.name === "website") {
          const url = directiveNode.attributes?.url;
          if (url) {
            websiteNodes.push({ node: directiveNode, url });
          }
        }

        data.hName = directiveNode.name;
        data.hProperties = directiveNode.attributes || {};
      }
    });

    await Promise.all(
      websiteNodes.map(async ({ node, url }) => {
        let ogData: OpenGraphData;

        if (ogCache.has(url)) {
          ogData = ogCache.get(url)!;
        } else {
          ogData = await fetchOpenGraph(url);
          ogCache.set(url, ogData);
        }

        const data = node.data || (node.data = {});
        data.hProperties = {
          ...((data.hProperties as Record<string, unknown>) || {}),
          ogData: JSON.stringify(ogData),
        };
      })
    );
  };
};

export default parseDirectives;
