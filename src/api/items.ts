import { itemSchema, itemsListSchema } from "@/lib/schema";
import { Item, ItemsList } from "@/lib/types";

export const getItems = async () => {
  try {
    const response = await fetch("/api/items");
    const data: ItemsList = await response.json();
    return itemsListSchema.parse(data);
  } catch (error) {
    console.log(error);
  }
};

export const getItem = async (id: string) => {
  try {
    const response = await fetch(`/api/getItem/${id}`);
    const data: Item = await response.json();
    return itemSchema.parse(data);
  } catch (error) {
    console.log(error);
  }
};

export const addItem = async (item: Item) => {
  try {
    const response = await fetch("/api/addItem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editItem = async (id: string, item: Item) => {
  try {
    const response = await fetch(`/api/editItem/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });
    // const data: { message: string } = await response.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async (id: string) => {
  try {
    const response = await fetch(`/api/deleteItem/${id}`, {
      method: "DELETE"
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
