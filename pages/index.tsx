import {
  ActionIcon,
  Button,
  Checkbox,
  Container,
  Group,
  Space,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons";

function Home() {
  const [todoItems, setTodoItems] = useState<Array<todoItem>>([]);

  const form = useForm({
    initialValues: {
      todoText: "",
    },
    validationRules: {
      todoText: (value) => value !== "",
    },
  });

  useEffect(() => {
    const todoItemStr = localStorage.getItem("todoItems");

    if (todoItemStr !== null) {
      setTodoItems(JSON.parse(todoItemStr));
    }
  }, []);

  return (
    <Container py={40} size="xs">
      <Title order={1} align="center">
        Todo App
      </Title>

      <Space h="xl" />

      <form
        onSubmit={form.onSubmit((values) => {
          form.setFieldValue("todoText", "");
          setTodoItems((items) => {
            const updatedItems = [
              ...items,
              {
                id: Date.now(),
                todoText: values.todoText,
                completed: false,
              },
            ];

            localStorage.setItem("todoItems", JSON.stringify(updatedItems));

            return updatedItems;
          });
        })}
      >
        <Group position="center" align="flex-end">
          <TextInput
            placeholder="Enter your Todo"
            {...form.getInputProps("todoText")}
          />
          <Button type="submit">Add Todo</Button>
        </Group>
      </form>
      <Space h="xl" />
      <Container size="xs">
        <Stack>
          {todoItems.map((item) => (
            <Group key={item.id} align="center" position="apart">
              <Checkbox
                checked={item.completed}
                onChange={(event) => {
                  setTodoItems((items) => {
                    const updatedItems = items.map((i) => {
                      if (i.id == item.id) {
                        return {
                          ...i,
                          completed: !i.completed,
                        };
                      } else {
                        return i;
                      }
                    });

                    localStorage.setItem(
                      "todoItems",
                      JSON.stringify(updatedItems)
                    );

                    return updatedItems;
                  });
                }}
                size="md"
                label={item.todoText}
                styles={{
                  label: {
                    color: item.completed ? "GrayText" : "white",
                    textDecoration: item.completed ? "line-through" : "initial",
                  },
                }}
              />
              <ActionIcon variant="filled" color="red">
                <IconTrash
                  onClick={() => {
                    setTodoItems((items) => {
                      const updatedItems = items.filter(
                        (filteredItem) => filteredItem.id != item.id
                      );

                      localStorage.setItem(
                        "todoItems",
                        JSON.stringify(updatedItems)
                      );

                      return updatedItems;
                    });
                  }}
                />
              </ActionIcon>
            </Group>
          ))}
        </Stack>
      </Container>
    </Container>
  );
}

interface todoItem {
  id: number;
  todoText: string;
  completed: boolean;
}

export default Home;
