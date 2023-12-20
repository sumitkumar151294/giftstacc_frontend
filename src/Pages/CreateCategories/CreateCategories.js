import React, { useState } from "react";
import BrandMapping from "./BrandMapping/BrandMapping";
import CategoryList from "./CategoryList/CategoryList";

const CreateCategories = () => {
    return (
        <div className="content-body">
            <BrandMapping />
            <CategoryList />
        </div>
    );
};

export default CreateCategories;

