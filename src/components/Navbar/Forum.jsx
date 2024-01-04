import React from "react";
import Navbar from "../Navbar";
  
function Forum() {

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center m-[3rem]">
        <div className="mt-0 rounded-t-md flex p-5 w-[50rem] bg-[#202020] text-white">
          <div className="flex flex-col w-[50rem]">
            <a className="text-[2.5rem]">Server</a>
          </div>
        </div>
        <div className="border-t border-b border-[#505050] flex p-5 w-[50rem] bg-black bg-opacity-90 text-white">
          <div className="flex flex-col w-[50rem]">
            <a href="/cat/0" className="text-[1.1rem]">Announcements & Information</a>
          </div>
        </div>
        <div className="border-b border-[#505050] flex p-5 w-[50rem] bg-black bg-opacity-90 text-white">
          <div className="flex flex-col w-[50rem]">
            <a href="/cat/1" className="text-[1.1rem]">Rules</a>
          </div>
        </div>
        <div className="border-b border-[#505050] flex p-5 w-[50rem] bg-black bg-opacity-90 text-white">
          <div className="flex flex-col w-[50rem]">
            <a href="/cat/2" className="text-[1.1rem]">Research and Development</a>
          </div>
        </div>
        <div className="border-bflex p-5 w-[50rem] bg-black bg-opacity-90 text-white">
          <div className="flex flex-col w-[50rem]">
            <a href="/cat/3" className="text-[1.1rem]">Tutorials</a>
          </div>
        </div>
        <div className="mt-20 rounded-t-md flex p-5 w-[50rem] bg-[#202020] text-white">
          <div className="flex flex-col w-[50rem]">
            <a className="text-[2.5rem]">City</a>
          </div>
        </div>
        <div className="border-t border-b border-[#505050] flex p-5 w-[50rem] bg-black bg-opacity-90 text-white">
          <div className="flex flex-col w-[50rem]">
            <a href="/cat/4" className="text-[1.1rem]">Faction Introduce</a>
          </div>
        </div>
        <div className="border-b border-[#505050] flex p-5 w-[50rem] bg-black bg-opacity-90 text-white">
          <div className="flex flex-col w-[50rem]">
            <a href="/cat/5" className="text-[1.1rem]">Character Introduce</a>
          </div>
        </div>
        <div className="border-[#505050] flex p-5 w-[50rem] bg-black bg-opacity-90 text-white">
          <div className="flex flex-col w-[50rem]">
            <a href="/cat/6" className="text-[1.1rem]">Shops</a>
          </div>
        </div>
        <div className="mt-20 rounded-t-md flex p-5 w-[50rem] bg-[#202020] text-white">
          <div className="flex flex-col w-[50rem]">
            <a className="text-[2.5rem]">Out of Roleplay</a>
          </div>
        </div>
        <div className="border-t border-b border-[#505050] flex p-5 w-[50rem] bg-black bg-opacity-90 text-white">
          <div className="flex flex-col w-[50rem]">
            <a href="/cat/7" className="text-[1.1rem]">Discuss</a>
          </div>
        </div>
        <div className="border-b border-[#505050] flex p-5 w-[50rem] bg-black bg-opacity-90 text-white">
          <div className="flex flex-col w-[50rem]">
            <a href="/cat/8" className="text-[1.1rem]">Screenshots</a>
          </div>
        </div>
        <div className="border-b border-[#505050] flex p-5 w-[50rem] bg-black bg-opacity-90 text-white">
          <div className="flex flex-col w-[50rem]">
            <a href="/cat/9" className="text-[1.1rem]">Technical Support</a>
          </div>
        </div>
        <div className="border-bflex p-5 w-[50rem] bg-black bg-opacity-90 text-white">
          <div className="flex flex-col w-[50rem]">
            <a href="/cat/10" className="text-[1.1rem]">Mods</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;