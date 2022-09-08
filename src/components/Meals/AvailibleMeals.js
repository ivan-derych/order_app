import React, { useEffect, useState } from "react";
import Card from "../UI/Card";

import classes from "./AvailibleMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailibleMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://max-meal-order-app-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something want wrong");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    
      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    
  }, []);

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.loading}>
        <p>{httpError}</p>
      </section>
    );
  }
  
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailibleMeals;
