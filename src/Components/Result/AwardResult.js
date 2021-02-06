import React, { useEffect, useState } from 'react';
// import { Chart } from "react-google-charts";
import axios from '../../axios';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import { Select } from 'antd';
import { Checkbox } from 'antd';
import { Modal, Button } from 'antd';
import NomineeCard from '../../Components/Cards/NomineeCard';

const { Option } = Select;
const Graph = ({ match, id, isModalVisible, setIsModalVisible }) => {
  const [ageFilter, setAgeFilter] = useState('Age');
  const [regionFilter, setRegionFilter] = useState('Region');
  const [genderFilter, setGenderFilter] = useState('Gender');
  const [overall, setOverall] = useState(true);
  const [data, setData] = useState([]);

  const [data1, setData1] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 430,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#000'],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#000'],
      },
      xaxis: {
        title: { text: 'Percentage votes' },
        categories: [],
      },
      yaxis: {
        min: 0,
        max: 100,
        title: {
          text: 'Nominees',
        },
      },
    },
  });

  useEffect(() => {
    fetchResult();
  }, []);

  const dat1 = [];
  const dat2 = [];
  const dat3 = [];
  const dat4 = [];
  let seriesData = [];

  const setDat = () => {
    Object.keys(data).length > 0 &&
      data.award.nominations.length > 0 &&
      data.award.nominations.map((n) => {
        // dat.push([n.name,data.nominees[n.name].audience,data.nominees[n.name].jury,data.nominees[n.name].overall.percentage])
        dat1.push(n.name);
        dat2.push(data.nominees[n.name].audience);
        dat3.push(data.nominees[n.name].jury);
        dat4.push(data.nominees[n.name].overall.percentage);
      });

    seriesData = [
      {
        name: 'Audience Votes',
        data: [...dat2],
      },
      {
        name: 'Jury Votes',
        data: [...dat3],
      },
      {
        name: 'Overall',
        data: [...dat4],
      },
    ];
    setData1({ ...data1, series: seriesData });

    setData1((prevState) => ({
      ...prevState, // copy all other field/objects
      options: {
        // recreate the object that contains the field to update
        ...prevState.options, // copy all the fields of the object
        xaxis: { ...prevState.xaxis, categories: [...dat1] }, // overwrite the value of the field to update
      },
    }));
    return seriesData;
  };

  const fetchResult = async () => {
    // await axios.get(`award/results/guest?id=${match.params.id}`)
    await axios.get(`award/results/guest?id=${id}`).then((res) => {
      setData(res.data.payload);
      console.log(res.data.payload);
    });
  };

  useEffect(() => {
    let timer1 = setTimeout(() => setDat(), 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, [data1]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <center>
        <div
          style={{
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <NomineeCard p={Object.keys(data).length > 0 && data.winner} />
          Winner
        </div>
      </center>
      <ReactApexChart
        options={data1.options}
        series={data1.series}
        type='bar'
        height={400}
      />
    </div>
  );
};

export default Graph;
