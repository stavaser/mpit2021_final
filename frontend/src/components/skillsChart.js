import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';

const SkillsChart = () => {
  var data = [
    {
      type: '1',
      value: 27,
    },
    {
      type: '1',
      value: 25,
    },
    {
      type: '1',
      value: 18,
    },
    {
      type: '2',
      value: 15,
    },
    {
      type: '2',
      value: 10,
    },
    {
      type: '3',
      value: 5,
    },
  ];
  var config = {
    legend: {
      layout: 'horizontal',
      position: 'bottom',
    },
    statistic: {
      title: true,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        value: {
          formatter: function formatter(v) {
            return v;
          },
        },
      },
    },
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,

    label: {
      type: 'inner',
      offset: '-50%',
      style: { textAlign: 'center' },
      autoRotate: false,
      content: '{value}',
    },
    interactions: [
      { type: 'element-selected' },
      { type: 'element-active' },
      { type: 'pie-statistic-active' },
    ],
  };
  return <Pie {...config} />;
};

export default SkillsChart;
