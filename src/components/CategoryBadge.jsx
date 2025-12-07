import React from "react";
import { Link } from "react-router-dom";

export default function CategoryBadge({ category }) {
  return (
    <Link to={`/categories?cat=${category.id}`} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
      {category.name}
    </Link>
  );
}
