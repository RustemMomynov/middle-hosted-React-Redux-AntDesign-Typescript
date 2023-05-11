import { Button, Checkbox, DatePicker, Form, Input, Row, Select } from "antd";
import { Moment } from "moment";
import React, { FC, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";
import { IUser } from "../models/IUser";
import { formatDate } from "../utils/date";
import { rules } from "../utils/rules";

const { Option } = Select;

interface EventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
  const [event, setEvent] = useState<IEvent>({
    author: "",
    date: "",
    discription: "",
    guest: "",
  } as IEvent);

  const { user } = useTypedSelector((state) => state.auth);

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({ ...event, date: formatDate(date.toDate()) });
    }
  };

  const submitForm = () => {
    props.submit({ ...event, author: user.username });
  };

  return (
    <Form
      onFinish={submitForm}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Описание события"
        name="discription"
        rules={[
          rules.required(),
          rules.isDateAfter("Нельзя создать событие в прошлом"),
        ]}
      >
        <Input
          onChange={(e) => setEvent({ ...event, discription: e.target.value })}
          value={event.discription}
        />
      </Form.Item>
      <Form.Item label="Дата события">
        <DatePicker onChange={(date) => selectDate(date)} />
      </Form.Item>
      <Form.Item label="Выберите гостя" name="guest">
        <Select
          onChange={(guest: string) => {
            setEvent({ ...event, guest });
          }}
        >
          {props.guests.map((guest) => (
            <Option value={guest.username}>{guest.username}</Option>
          ))}
        </Select>
      </Form.Item>
      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;
