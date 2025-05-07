import React from 'react';
import { Container, Title, Text, Button, Accordion, Paper, Footer } from '@mantine/core';

const FooterCont = () => {
  return (
      <Footer height="auto" style={{ backgroundColor: '#000', color: '#fff', marginTop: '60px', display:"flex", alignItems:'center' }}>
        <Container>
          <Text align="center" size="sm" py={6}>
            © 2025 Your Company. All rights reserved.
          </Text>
        </Container>
      </Footer>
  );
}

export default FooterCont;
