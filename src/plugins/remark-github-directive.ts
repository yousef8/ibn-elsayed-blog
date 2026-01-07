import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { Plugin } from "unified";

const parseDirectives: Plugin<[], Root> = () => {
  return tree => {
    visit(tree, node => {
      // Handle text directives like ::github{repo="user/repo"}
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        const data = node.data || (node.data = {});

        data.hName = node.name;
        data.hProperties = node.attributes || {};
      }
    });
  };
};

export default parseDirectives;
