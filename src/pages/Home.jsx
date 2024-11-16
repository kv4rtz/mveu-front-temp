import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import styles from "./Post.module.scss";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs
        TabIndicatorProps={{ style: { backgroundColor: "#312285" } }}
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Проекты" />
        <Tab label="Видео" />
      </Tabs>
      <Grid xs={4} item>
        <TagsBlock items={tags.items} isLoading={isTagsLoading} />
      </Grid>

      <Grid container>
        {/* <Grid xs={3} item> */}
        <div className={styles.container}>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Grid className={styles.item}>
                <Post
                  id={obj._id}
                  title={obj.title}
                  imageUrl={
                    obj.imageUrl
                      ? `https://api.itroom18.ru/mveu/temp/api${obj.imageUrl}`
                      : ""
                  }
                  user={obj.user}
                  // createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  rateCount={5}
                  tags={obj.tags}
                  isEditable={userData?._id === obj.user._id}
                />
              </Grid>
            ),
          )}
        </div>
        {/* </Grid> */}
      </Grid>
    </>
  );
};
