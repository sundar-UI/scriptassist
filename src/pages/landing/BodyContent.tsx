import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Accordion, Paper, Footer } from '@mantine/core';

const BodyContent = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Paper
        style={{
          background: '#20233a',
          padding: '100px 0',
          color: 'white',
          textAlign: 'center',
          borderRadius:0
        }}
      >
        <Title order={1}>Welcome to Our Landing Page!</Title>
        <Text size="lg" style={{ margin: '20px 0' }}>
          Discover our amazing features and services.
        </Text>
        <Button variant="light" size="lg" onClick={() => navigate('/launches')}>
          Go Launches
        </Button>
      </Paper>
      <Container size="md" style={{ marginTop: '40px' }}>
        <Accordion  className="accordion-container">
          <Accordion.Item value="section-1">
            <Accordion.Control className="accordion-control">Section 1</Accordion.Control>
            <Accordion.Panel className="accordion-panel">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula quam at justo luctus
              suscipit.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="section-2">
            <Accordion.Control className="accordion-control">Section 2</Accordion.Control>
            <Accordion.Panel className="accordion-panel">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="section-3">
            <Accordion.Control className="accordion-control">Section 3</Accordion.Control>
            <Accordion.Panel className="accordion-panel">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
              magni dolores eos qui ratione voluptatem sequi nesciunt.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
    </div>
  );
}

export default BodyContent;
