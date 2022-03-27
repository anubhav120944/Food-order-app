import { useEffect, useState } from "react";
import Card from "../UI/Card";
import Spinner from "../UI/Spinner";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchMeals = async () => {
        const response = await fetch(
          "https://react-blog-app-45fb9-default-rtdb.firebaseio.com/meals.json"
        );
        if (!response.ok) {
          throw new Error(
            "Something went wrong , sorry for the inconvenience caused !!"
          );
        }
        const data = await response.json();
        let mealsData = [];
        for (const key in data) {
          mealsData.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMeals(mealsData);
        setIsLoading(false);
      };
      fetchMeals();
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {
            meals.map((meal) => {
              return (
                <MealItem
                  key={meal.id}
                  id={meal.id}
                  price={meal.price}
                  name={meal.name}
                  description={meal.description}
                />
              );
            })
          }
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
