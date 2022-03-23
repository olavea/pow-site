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

// 1.2.3 – A.B.C. – Ruby's TimeShip
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

  // 2. buildingSong 🎵 🦢
  // happy build day to you, focus build day to you
  const bakingSong = require.resolve("./src/templates/pageTemplate.js");
  // 3. timeNode ⏰ 💰
  // Loop over the supplies.nodes and
  //
  // for each yearNode bake a page
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

exports.onCreateNode = async (gatsbyUtils) => {
  await slugifyMarkdownRemarkNode(gatsbyUtils);
};

exports.createPages = async (gatsbyUtils) => {
  await bakeMarkdownNodesIntoPages(gatsbyUtils);
};
