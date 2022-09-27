import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { DataType } from "./model/DataType";
import Nav from "./components/Nav";
import { data } from "../data";

const Create: NextPage = () => {
  const [newPost, setNewPost] = useState<DataType>({
    id: 0,
    title: "",
    body: "",
  });
  const [newID, setNewID] = useState<number>(0);
  const { title, body } = newPost;

  useEffect(() => {
    if(newPost.id === 0){
        getAPILength();
    } else {
      return;
    }
  },[setNewPost])

  /** 
   * ************* QUESTION *********************
   * how to get size of json file on submit without running multiple GET requests?  */
  const getAPILength = async () => {
    const api = await fetch('http://localhost:3000/api/data/allPosts')
    const data = await api.json();
    setNewID(data.length+1);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/data/allPosts', {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
          clearFields();
        })
        console.log('handleSubmit ran')
        
    } catch (err) {
        console.error("error on post request ", err);
    }
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setNewPost((prev) => {
      (prev as any)[name] = value;
      prev.id = newID;
      return { ...prev };
    });

    const clearFields = () => {
        setNewPost({ id: 0, title: '', body: ''})
    }

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-yellow-500 from-orange-500 to-pink-500">
      <Nav />
      <div className="w-screen grid justify-center">
        <h1 className="text-2xl uppercase font-bold text-center">New Post Form</h1>
        <form onSubmit={(e) => {handleSubmit(e);}} className="flex flex-col w-[30vw] gap-y-2 mt-2">
          <input
            type="text"
            name="title"
            placeholder="enter title"
            value={title}
            onChange={(e) => {handleChange(e)}}
            id="title"
            required
          />
          <input
            type="text"
            name="body"
            placeholder="enter body"
            value={body}
            onChange={(e) => handleChange(e)}
            className="h-[30vw]"
            id="body"
            required
          />
          <button type="submit" className="border-[1px] h-16 border-solid border-black m-2">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
