import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { Select } from 'antd';
import axios from '../../axios';
import ReactApexChart from 'react-apexcharts';
import { Switch } from 'antd';

const Bar = ({ id, isModalVisible, setIsModalVisible }) => {
  console.log(id, 'id');
  const [data, setData] = useState([]);
  const [age, setAge] = useState([]);
  const [gender, setGender] = useState([]);
  const [region, setRegion] = useState([]);
  const [overall, setOverall] = useState(true);

  useEffect(() => {
    if (id) {
      fetchResult();
    }
  }, [id]);

  const { Option } = Select;

  function handleAgeChange(value) {
    console.log(`selected ${value}`);
    setAge(value);
  }
  function handleGenderChange(value) {
    console.log(`selected ${value}`);
    setGender(value);
  }
  function handleRegionChange(value) {
    console.log(`selected ${value}`);
    setRegion(value);
  }
  const fetchResult = async () => {
    if (id) {
      await axios.get(`poll/results/guest?id=${id}`).then((res) => {
        setData(res.data.payload);
        console.log(res.data.payload, 'Poll result');
        if (Object.keys(res.data.payload).length > 0) {
          console.log(res.data.options);
        }
      });
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChangeOverall = (checked) => {
    setOverall(checked);
  };
  return (
    <>
      {Object.keys(data).length > 0 && (
        <Modal
        className="pol-res"
          onOk={handleOk}
          onCancel={handleCancel}
          title='Poll result'
          visible={isModalVisible}
        >
          <span  className="chck">
            Overall <Switch defaultChecked onChange={onChangeOverall} />
          </span>
          <Select
          className="sel"
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='select Age group'
            defaultValue={[]}
            onChange={handleAgeChange}
            optionLabelProp='label'
          >
            {Object.keys(data).length > 0 &&
              Object.keys(data.age).map((key, ind) => (
                <Option value={key} label={key}>
                  {key}
                </Option>
              ))}
          </Select>
          <Select
          className="sel"
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='select Gender'
            defaultValue={[]}
            onChange={handleGenderChange}
            optionLabelProp='label'
          >
            {Object.keys(data).length > 0 &&
              Object.keys(data.gender).map((key, ind) => (
                <Option value={key} label={key}>
                  {key}
                </Option>
              ))}
          </Select>
          <Select
          className="sel"
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='select Regions'
            defaultValue={[]}
            onChange={handleRegionChange}
            optionLabelProp='label'
          >
            {Object.keys(data).length > 0 &&
              Object.keys(data.region).map((key, ind) => (
                <Option value={key} label={key}>
                  {key}
                </Option>
              ))}
          </Select>

          <p>{data.poll.question}</p>

          {overall && (
            <div className='overall-div'>
              {data &&
                Object.keys(data).length > 0 &&
                data.poll.type === 'pie' && (
                  <div>
                    <span>Overall</span>
                    <ReactApexChart
                      type='pie'
                      series={Object.values(
                        Object.keys(data.global).map((key, ind) => {
                          return data.global[key];
                        })
                      )}
                      options={{
                        chart: {
                          width: '100%',
                          type: 'pie',
                        },
                        labels: Object.values(data.options),
                        responsive: [
                          {
                            breakpoint: 1280,
                            options: {
                              chart: {
                                width: '100%',
                              },
                              legend: {
                                position: 'bottom',
                              },
                            },
                          },
                        ],
                      }}
                    />
                  </div>
                )}

              {data &&
                Object.keys(data).length > 0 &&
                data.poll.type === 'bar' && (
                  <div>
                    <span>Overall</span>
                    <p><span style={{marginRight:'1rem'}}>Total votes :{data.global.totalVotes}</span><span>Average Rating:{data.global.averageRating}</span></p>

                    <ReactApexChart
                      type='bar'
                      series={[
                        {
                          data: data.global.chartData.map((p) => {
                            return p.perc;
                          }),
                        },
                      ]}
                      options={{
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
                            colors: ['#fff'],
                          },
                        },
                        stroke: {
                          show: true,
                          width: 1,
                          colors: ['#fff'],
                        },
                        xaxis: {
                          title: { text: 'Percentage votes' },
                          categories: data.global.chartData.map((p) => {
                            return p.rating;
                          }),
                        },
                        yaxis: {
                          min: 0,
                          max: 100,
                          title: {
                            text: 'Ratings',
                          },
                        },
                      }}
                    />
                  </div>
                )}
            </div>
          )}

          <div className='age-div'>
            {data &&
              Object.keys(data).length > 0 &&
              data.poll.type === 'pie' &&
              age.length > 0 &&
              age.map((a) => (
                <div>
                  <span>Age {a}</span>
                  {console.log(
                    Object.values(
                      Object.keys(data.age[a]).map((key, ind) => {
                        return data.age[a][key];
                      })
                    )
                  )}
                  <ReactApexChart
                    type='pie'
                    series={Object.values(
                      Object.keys(data.age[a]).map((key, ind) => {
                        return data.age[a][key];
                      })
                    )}
                    options={{
                      chart: {
                        width: '100%',
                        type: 'pie',
                      },
                      labels: Object.values(data.options),
                      responsive: [
                        {
                          breakpoint: 1280,
                          options: {
                            chart: {
                              width: '100%',
                            },
                            legend: {
                              position: 'bottom',
                            },
                          },
                        },
                      ],
                    }}
                  />
                </div>
              ))}

            {data &&
              Object.keys(data).length > 0 &&
              data.poll.type === 'bar' &&
              age.length > 0 &&
              age.map((a) => (
                <div>
                  <span>Age {a}</span>
                  <p><span style={{marginRight:'1rem'}}>Total votes :{data.age[a].totalVotes}</span><span>Average Rating:{data.age[a].averageRating}</span></p>

                  {console.log(
                    data.age[a].chartData.map((p) => {
                      return p.perc;
                    })
                  )}
                  {console.log(
                    data.age[a].chartData.map((p) => {
                      return p.rating;
                    })
                  )}{' '}
                  <ReactApexChart
                    type='bar'
                    series={[
                      {
                        data: data.age[a].chartData.map((p) => {
                          return p.perc;
                        }),
                      },
                    ]}
                    options={{
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
                          colors: ['#fff'],
                        },
                      },
                      stroke: {
                        show: true,
                        width: 1,
                        colors: ['#fff'],
                      },
                      xaxis: {
                        title: { text: 'Percentage votes' },
                        categories: data.age[a].chartData.map((p) => {
                          return p.rating;
                        }),
                      },
                      yaxis: {
                        min: 0,
                        max: 100,
                        title: {
                          text: 'Ratings',
                        },
                      },
                    }}
                  />
                </div>
              ))}
          </div>

          <div className='gender-div'>
            {data &&
              Object.keys(data).length > 0 &&
              data.poll.type === 'pie' &&
              gender.length > 0 &&
              gender.map((a) => (
                <div>
                  <span>Gender {a}</span>
                  {console.log(
                    Object.values(
                      Object.keys(data.gender[a]).map((key, ind) => {
                        return data.gender[a][key];
                      })
                    )
                  )}
                  <ReactApexChart
                    type='pie'
                    series={Object.values(
                      Object.keys(data.gender[a]).map((key, ind) => {
                        return data.gender[a][key];
                      })
                    )}
                    options={{
                      chart: {
                        width: '100%',
                        type: 'pie',
                      },
                      labels: Object.values(data.options),
                      responsive: [
                        {
                          breakpoint: 1280,
                          options: {
                            chart: {
                              width: '100%',
                            },
                            legend: {
                              position: 'bottom',
                            },
                          },
                        },
                      ],
                    }}
                  />
                </div>
              ))}

            {data &&
              Object.keys(data).length > 0 &&
              data.poll.type === 'bar' &&
              gender.length > 0 &&
              gender.map((a) => (
                <div>
                  <span>Gender {a}</span>
                  <p><span style={{marginRight:'1rem'}}>Total votes :{data.gender[a].totalVotes}</span><span>Average Rating:{data.gender[a].averageRating}</span></p>
                  {console.log(
                    data.gender[a].chartData.map((p) => {
                      return p.perc;
                    })
                  )}
                  {console.log(
                    data.gender[a].chartData.map((p) => {
                      return p.rating;
                    })
                  )}{' '}
                  <ReactApexChart
                    type='bar'
                    series={[
                      {
                        data: data.gender[a].chartData.map((p) => {
                          return p.perc;
                        }),
                      },
                    ]}
                    options={{
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
                          colors: ['#fff'],
                        },
                      },
                      stroke: {
                        show: true,
                        width: 1,
                        colors: ['#fff'],
                      },
                      xaxis: {
                        title: { text: 'Percentage votes' },
                        categories: data.gender[a].chartData.map((p) => {
                          return p.rating;
                        }),
                      },
                      yaxis: {
                        min: 0,
                        max: 100,
                        title: {
                          text: 'Ratings',
                        },
                      },
                    }}
                  />
                </div>
              ))}
          </div>
          <div className='region-div'>
            {data &&
              Object.keys(data).length > 0 &&
              data.poll.type === 'pie' &&
              region.length > 0 &&
              region.map((a) => (
                <div>
                  <span>Region {a}</span>
                  {console.log(
                    Object.values(
                      Object.keys(data.region[a]).map((key, ind) => {
                        return data.region[a][key];
                      })
                    )
                  )}
                  <ReactApexChart
                    type='pie'
                    series={Object.values(
                      Object.keys(data.region[a]).map((key, ind) => {
                        return data.region[a][key];
                      })
                    )}
                    options={{
                      chart: {
                        width: '100%',
                        type: 'pie',
                      },
                      labels: Object.values(data.options),
                      responsive: [
                        {
                          breakpoint: 1280,
                          options: {
                            chart: {
                              width: '100%',
                            },
                            legend: {
                              position: 'bottom',
                            },
                          },
                        },
                      ],
                    }}
                  />
                </div>
              ))}

            {data &&
              Object.keys(data).length > 0 &&
              data.poll.type === 'bar' &&
              region.length > 0 &&
              region.map((a) => (
                <div>
                  <span>Region {a}</span>
                  <p><span style={{marginRight:'1rem'}}>Total votes :{data.region[a].totalVotes}</span><span>Average Rating:{data.region[a].averageRating}</span></p>
                  {console.log(
                    data.region[a].chartData.map((p) => {
                      return p.perc;
                    })
                  )}
                  {console.log(
                    data.region[a].chartData.map((p) => {
                      return p.rating;
                    })
                  )}{' '}
                  <ReactApexChart
                    type='bar'
                    series={[
                      {
                        data: data.region[a].chartData.map((p) => {
                          return p.perc;
                        }),
                      },
                    ]}
                    options={{
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
                          colors: ['#fff'],
                        },
                      },
                      stroke: {
                        show: true,
                        width: 1,
                        colors: ['#fff'],
                      },
                      xaxis: {
                        title: { text: 'Percentage votes' },
                        categories: data.region[a].chartData.map((p) => {
                          return p.rating;
                        }),
                      },
                      yaxis: {
                        min: 0,
                        max: 100,
                        title: {
                          text: 'Ratings',
                        },
                      },
                    }}
                  />
                </div>
              ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Bar;
