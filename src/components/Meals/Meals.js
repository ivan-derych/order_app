import React, { Fragment } from "react";

import AvailibleMeals from "./AvailibleMeals";
import MealsSummary from "./MealsSummery";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailibleMeals />
    </Fragment>
  );
};

export default Meals;