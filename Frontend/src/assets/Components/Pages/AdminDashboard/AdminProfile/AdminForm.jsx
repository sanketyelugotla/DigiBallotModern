import React, { useContext, useEffect, useState } from "react";
import { databaseContext, userContext, loadingContext } from "../../../../Hooks/ContextProvider/ContextProvider";
import styleForm from "./AdminForm.module.css";
import { Election, Party, Personel } from "./Forms";
import { sectionsContext } from "./SectionsContextProvider";

export default function AdminForm() {

    return (
        <div className={styleForm.full}>
            <form encType="multipart/form-data">
                {/* Personal Information */}
                <Personel />

                {/* Party Information */}
                <Party />

                {/* Election Information */}
                <Election />

            </form>
        </div>
    );
}
