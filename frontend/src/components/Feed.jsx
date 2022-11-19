import React from "react";
import { useState, useEffect } from "react";
import { RiSearch2Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { searchQuery } from "../utils/data";
import { feedQuery } from "../utils/data";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState();
  const { categoryId } = useParams();
  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message="We are adding a new spinner for your feed..." />;
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
