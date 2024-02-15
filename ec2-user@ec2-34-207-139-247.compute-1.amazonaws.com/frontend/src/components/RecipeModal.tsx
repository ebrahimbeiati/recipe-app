import React from "react";
import { useState, useEffect } from "react";
import { RecipeSummary } from "../types";
import * as RecipeAPI from "../api";

interface Props {
  recipeId: string;
  onClose: () => void;
}

const RecipeModal = ({ recipeId, onClose }: Props) => {
  const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>();

  useEffect(() => {
    const fetchRecipeSummary = async () => {
      try {
        const recipeSummary = await RecipeAPI.getRecipeSummary(
          String(recipeId)
        );
        setRecipeSummary(recipeSummary);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipeSummary();
  }, [recipeId]);

  if (!recipeSummary) {
    return <></>;
  }

  return (
    <>
      <div className="overlay">
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{recipeSummary.title}</h4>
            </div>
            <div className="modal-body">
              <p>Summary of the recipe.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                onClick={onClose}
              >
                ❌
              </button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: recipeSummary.summary }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeModal;
