"use client";

import React, { useRef } from "react";
import { useLinkStore } from "@/stores/linkStore";

const LinkList = () => {
  const { links, removeLink } = useLinkStore();

  const onRemove = (id: string) => {
    removeLink(id);
  };

  return (
    <div>
      {links.length === 0 ? (
        <div className="skeleton">No links available</div>
      ) : (
        links.map((link) => (
          <div key={link.id} className="link-item">
            <p>
              {link.type}: {link.url}
            </p>
            <button onClick={() => onRemove(link.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default LinkList;
