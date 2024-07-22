import { SchemaOptionsContext } from "@formily/react";
import { useContext } from "react";

export const useSchemaOptionsContext = () => {
    const options = useContext(SchemaOptionsContext);
    return options || {};
};