import Link from "next/link";
import {
  Button,
  Container,
  Group,
  List,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/hooks";

function Home() {
  const [todoItems, setTodoItems] = useState<Array<string>>([]);
  const form = useForm({
    initialValues: {
      todoText: "",
    },
    validationRules: {
      todoText: (value) =>
        value !== "" && todoItems.find((item) => item === value) == undefined,
    },
  });

  return (
    <Container size="xs">
      <Title order={1} align="center">
        Todo App
      </Title>

      <form
        onSubmit={form.onSubmit((values) =>
          setTodoItems([...todoItems, values.todoText])
        )}
      >
        <Group position="center" align="flex-end">
          <TextInput
            placeholder="Enter your Todo"
            label="Todo Input"
            {...form.getInputProps("todoText")}
          />
          <Button type="submit">Add Todo</Button>
        </Group>
      </form>
      <List>
        {todoItems.map((item) => (
          <List.Item key={item}>{item}</List.Item>
        ))}
      </List>
    </Container>
  );
}

export default Home;
