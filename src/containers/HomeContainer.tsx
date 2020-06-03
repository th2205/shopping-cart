import React from 'react';
import Home from '../components/Home';

interface mockTypes {
  [key: string]: {
    id?: string;
    count: number;
    name: string;
    price: number;
  };
}

const mock: mockTypes = {
  i_1: {
    count: 1,
    name: '여성컷',
    price: 35000
  },
  i_2: {
    count: 1,
    name: '남성컷',
    price: 30000
  },
  i_3: {
    count: 1,
    name: '드라이',
    price: 30000
  },
  i_4: {
    count: 1,
    name: '기본펌',
    price: 100000
  },
  i_5: {
    count: 1,
    name: '염색',
    price: 60000
  },
  i_6: {
    count: 1,
    name: '부분염색',
    price: 25000
  }
};

export default function HomeContainer() {
  const menusById = Object.entries(mock).map((element) => {
    const [id, content] = element;

    content.id = id;

    return content;
  });
  const allIds = Object.keys(mock);
  const menus = allIds.map((id) => mock[id]);
  return <Home menus={menus} />;
}
