// pages/index.js

import Post from "components/Post";
import Layout from "components/layout/Layout";
import PageHeader from "components/PageHeader";

import { Container, Grid } from "@material-ui/core";

import { getAllPosts } from "lib/index";

export async function getStaticProps() {
  const posts = await getAllPosts();

  // Optional: Filter out draft posts
  const publishedPosts = posts.filter((post) => post.frontmatter.draft !== true);

  return {
    revalidate: 1,
    props: {
      posts: publishedPosts,
    },
  };
}

export default function Index({ posts }) {
  return (
    <Layout
      title="Best New Short Hairstyles 2025 | Trendy & Chic Haircuts for Every Face Shape"
      description="Discover the best new short hairstyles for 2025! From edgy pixie cuts to stylish bobs, find trendy and flattering haircuts perfect for every face shape and lifestyle. Stay ahead in fashion with the latest short hair trends!"
    >
      <Container maxWidth="lg">
        <PageHeader />

        <Grid container spacing={4}>
          {posts?.map(({ slug, frontmatter }) => (
            <Grid item key={slug} xs={12} sm={6} md={4}>
              <Grid container>
                <Post
                  title={frontmatter.title}
                  subtitle={frontmatter.subTitle}
                  authorName={frontmatter.author}
                  authorImage={frontmatter.authorImage}
                  slug={slug}
                  date={frontmatter.date}
                  coverImage={frontmatter.coverImage}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
}
