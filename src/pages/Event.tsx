import { Button, Calendar, Layout, Row, Modal } from "antd";
import React, { FC, useEffect, useState } from "react";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";

const Event: FC = () => {
  const { fetchGuests, createEvent, fetchEvents } = useActions();

  const { guests, events } = useTypedSelector((state) => state.event);

  const { user } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);

  const addNewEvent = (event: IEvent) => {
    setIsModalVisible(false);
    createEvent(event);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <Row justify="center" align="middle" className="h100">
        <EventCalendar events={events} />
        <Row justify="center">
          <Button type="primary" onClick={showModal}>
            Open Modal
          </Button>
          <Modal
            title="Добавить событие"
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
          >
            <EventForm guests={guests} submit={addNewEvent} />
          </Modal>
        </Row>
      </Row>
    </Layout>
  );
};

export default Event;
