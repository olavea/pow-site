const { createFilePath } = require("gatsby-source-filesystem");

async function slugifyMarkdownRemarkNode(gatsbyUtils) {
  const { actions, node, getNode } = gatsbyUtils;
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode });

    createNodeField({
      name: "slug",
      node,
      value: slug,
    });
  }
}

// POW!-website/gatsby-node.js

// 1.2.3 – A.B.C. – Gingerbread house
// 0. gatsbyUtils 🔧
async function bakeMarkdownNodesIntoPages(gatsbyUtils) {
  const { graphql, actions, reporter } = gatsbyUtils;

  // 1. filter ☕ first
  const { data } = await graphql(`
    {
      supplies: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/index.md/" } }
      ) {
        nodes {
          id
          fileAbsolutePath
          fields {
            slug
          }
        }
      }
    }
  `);

  // 2. bakingSong 🎵 🦢
  const bakingSong = require.resolve("./src/templates/pageTemplate.js");
  // 3. aromaNode 🍰💰
  // Loop over the supplies.nodes and
  // for each aromaNode bake a page
  data.supplies.nodes.forEach((aromaNode) => {
    // console.log(aromaNode.fields.slug, "💀📄");
    const aromaNodeSlug = aromaNode.fields.slug;
    const aromaNodePath = aromaNodeSlug === "/index/" ? "/" : aromaNodeSlug;

    actions.createPage({
      // A. aromaNodePath 🍰.🍓.🐛
      path: aromaNodePath,
      // B. bakingSong 🎵 🙀
      component: bakingSong,
      // C. catsbyId 😼🆔
      context: {
        catsbyId: aromaNode.id,
      },
    });

    reporter.info(`Created page for slug ${aromaNode.fields.slug}`);
  });
}
async function redirectToMyUsepowApp(gatsbyUtils) {
  const { actions } = gatsbyUtils;
  const { createRedirect } = actions;
  createRedirect({
    fromPath: "/login/",
    // This is correct, this page will check login status.
    // If user is logged in the app further redirects to "https://my.usepow.app/timeline".
    // If user is logged out the app further redirects to "https://my.usepow.app/login".
    toPath: "https://my.usepow.app/",
    isPermanent: true,
    redirectInBrowser: true,
  });

  createRedirect({
    fromPath: "/signup/",
    toPath: "https://my.usepow.app/signup",
    isPermanent: true,
    redirectInBrowser: true,
  });
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemarkFrontmatterSectionsVideos implements Node {
      childYouTube: YouTube @link(from: "id" by: "youTubeId")
    }
  `;
  createTypes(typeDefs);
};

exports.onCreateNode = async (gatsbyUtils) => {
  await slugifyMarkdownRemarkNode(gatsbyUtils);
};

exports.createPages = async (gatsbyUtils) => {
  await bakeMarkdownNodesIntoPages(gatsbyUtils);
  await redirectToMyUsepowApp(gatsbyUtils);
};
