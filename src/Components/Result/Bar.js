import React, { useState, useEffect } from 'react';
import { Modal, Button , Input} from 'antd';
import { Select } from 'antd';
import axios from '../../axios';
import ReactApexChart from 'react-apexcharts';
import { Switch } from 'antd';
import DownloadModal from '../Modal/Modal'
import { Pie , Bar } from '@ant-design/charts'
import { connect } from 'react-redux';

const Chart = ({ english:{english}, id, isModalVisible, setIsModalVisible }) => {
  console.log(id, 'id');
  const [data, setData] = useState([]);
  const [age, setAge] = useState([]);
  const [gender, setGender] = useState([]);
  const [region, setRegion] = useState([]);
  const [overall, setOverall] = useState(true);
  const [isDownloadModalVisible , setIsDownloadModalVisible] = useState(false);
  useEffect(() => {
    if (id) {
      // console.log('hi in bar.js')
      fetchResult();
    }
  }, [id]);

  const { Option } = Select;

  function handleAgeChange(value) {
    console.log(`selected ${value}`);
    setIsDownloadModalVisible(true);
    // setAge(value);
  }
  function handleGenderChange(value) {
    console.log(`selected ${value}`);
    setIsDownloadModalVisible(true);
    //setGender(value);
  }
  function handleRegionChange(value) {
    console.log(`selected ${value}`);
    setIsDownloadModalVisible(true);
    //setRegion(value);
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

  let chartData = [];
  let config = {};

  if (data && Object.keys(data).length > 0) {
    if (data.poll.type === 'pie') {
      chartData = Object.keys(data.global).map((key, ind) => {
        return{ type: english ? data.options[key] : data.poll.options.filter(option=>{return key == option.key})[0].name_hindi, value: data.global[key] }
      })

      config = {
        appendPadding: 10,
        data: chartData,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
          type: 'inner',
          content: function content(_ref) {
            var percent = _ref.percent;
            return ''.concat(Math.floor(percent * 100), '%');
          },
          style: {
            fontSize: 14,
            textAlign: 'center',
          },
        },
        state: {
          active: {
            style: {
              lineWidth: 0,
              fillOpacity: 0.65,
            },
          },
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
        legend: {
          layout: 'vertical',
          position: 'bottom',
          flipPage:false
        }
      };
    }
    if (data.poll.type === 'bar') {
      chartData = data.global.chartData.map((p) => {
        return { rating: `${p.rating}`, Percentage: p.perc};
      })
      chartData.reverse()
      config = {
        data: chartData,
        xField: 'Percentage',
        yField: 'rating',
        label: {
          position: 'middle',
          layout: [
            { type: 'interval-adjust-position' },
            { type: 'interval-hide-overlap' },
            { type: 'adjust-color' },
          ],
          content:function content(_ref) {
            var percent = _ref.Percentage;
            if(percent===0){
              return ''
            }
            return ''.concat(" ",percent, '%');
          }
        },
        color:'#ac074b'
      };
    }

  }

  return (
    <>
      <DownloadModal isModalVisible={isDownloadModalVisible} setIsModalVisible={setIsDownloadModalVisible} text={'To get detailed analysis of the results download PolBol app.'} />
      {Object.keys(data).length > 0 && (
        <Modal
        className="pol-res"
          onOk={handleOk}
          onCancel={handleCancel}
          visible={isModalVisible}
          footer={null}
        >
          {/* <span  className="chck">
            Overall <Switch defaultChecked onChange={onChangeOverall} />
          </span> */}
          <h2 style={{fontWeight:'bold', textAlign:'center'}}>Result</h2>
          <Input style={{marginTop:'10px',marginBottom:'5px'}}  readOnly placeholder="Age" onClick={handleAgeChange}/>
          {/* <Select
            className="sel"
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='select Age group'
            defaultValue={[]}
            onClick={handleAgeChange}
            onChange={handleAgeChange}
            optionLabelProp='label'
          >
            {Object.keys(data).length > 0 &&
              Object.keys(data.age).map((key, ind) => (
                <Option value={key} label={key}>
                  {key}
                </Option>
              ))}
          </Select> */}
          <Input style={{marginTop:'5px',marginBottom:'5px'}}  readOnly placeholder="Gender" onClick={handleGenderChange}/>
          {/* <Select
          className="sel"
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='select Gender'
            defaultValue={[]}
            onClick={handleGenderChange}
            onChange={handleGenderChange}
            optionLabelProp='label'
          >
            {Object.keys(data).length > 0 &&
              Object.keys(data.gender).map((key, ind) => (
                <Option value={key} label={key}>
                  {key}
                </Option>
              ))}
          </Select> */}
          <Input style={{marginTop:'5px',marginBottom:'10px'}}  readOnly placeholder="Regions" onClick={handleRegionChange}/>
          {/* <Select
          className="sel"
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='select Regions'
            defaultValue={[]}
            onClick={handleRegionChange}
            onChange={handleRegionChange}
            optionLabelProp='label'
          >
            {Object.keys(data).length > 0 &&
              Object.keys(data.region).map((key, ind) => (
                <Option value={key} label={key}>
                  {key}
                </Option>
              ))}
          </Select> */}

          <p>{english?data.poll.question:data.poll.question_hindi}</p>

          {overall && (
            <div className='overall-div'>
              {/* {data &&
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
                        dataLabels: {
                          enabled: false,
                          offsetX: -6,
                          style: {
                            fontSize: '12px',
                            colors: ['#fff'],
                          },
                        },
                        labels: Object.values(data.options),
                        responsive: [
                          {
                            breakpoint: 1800,
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
                )} */}

              {data && Object.keys(data).length > 0 &&
                data.poll.type === 'pie' && (
                  <div>
                      <p style={{textAlign:'center' , fontWeight:'bold'}}><p style={{ marginRight: '1rem', textTransform:'none' }}>{english ? 'Total votes':'संपूर्ण वोट'} :  {Object.values(data.global).reduce((prev,curr)=>{return curr+prev},0)}</p></p>
                    <Pie {...config} />
                  </div>
                )

              }

              
              {data && Object.keys(data).length > 0 &&
                data.poll.type === 'bar' && (
                  <div >
                    <p style={{textAlign:'center' , fontWeight:'bold'}}><p style={{ marginRight: '1rem', textTransform:'none' }}>{english ? 'Total votes':'संपूर्ण वोट'} : {data.global.totalVotes}</p><p>{english ? 'Average Rating':'औसत रेटिंग'} : {data.global.averageRating}/10</p></p>
                    <Bar {...config} />
                  </div>
                )

              }

              {/* {data &&
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
                          enabled: false,
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
                )} */}
            </div>
          )}

         { age.length>0&&<div className='age-div'>

            {data &&
              Object.keys(data).length > 0 &&
              data.poll.type === 'pie' &&
              age.length > 0 &&
              age.map((a) => (
                <div className="age">
                  <span style={{textTransform:"capitalize"}}>{a}</span>
                  {console.log(
                    Object.values(
                      Object.keys(data.age[a]).filter((key, ind) => {
                        return data.age[a][key]!==0;
                      })
                    ),
                    "pie-data"
                  )}

                 {Object.values(
                  Object.keys(data.age[a]).filter((key, ind) => {
                    return data.age[a][key]!==0;
                  })
                ).length>0? <ReactApexChart
                
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
                      dataLabels: {
                        enabled: false,
                        offsetX: -6,
                        style: {
                          fontSize: '12px',
                          colors: ['#fff'],
                        },
                      },
                      labels: Object.values(data.options),
                      responsive: [
                        {
                          breakpoint: 1800,
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
                  />:<center >
                  No votes for this filter</center>}
                </div>
              ))}

            {data &&
              Object.keys(data).length > 0 &&
              data.poll.type === 'bar' &&
              age.length > 0 &&
              age.map((a) => (
                <div className="age">
                  <span style={{textTransform:"capitalize"}}>{a}</span>
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
                        enabled: false,
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
          </div>}

        { gender.length>0&& <div className='gender-div'>
            {data &&
              Object.keys(data).length > 0 &&
              data.poll.type === 'pie' &&
              gender.length > 0 &&
              gender.map((a) => (
                <div className="age">
                  <span style={{textTransform:"capitalize"}}>{a}</span>
                  {console.log(
                    Object.values(
                      Object.keys(data.gender[a]).map((key, ind) => {
                        return data.gender[a][key];
                      })
                    )
                  )}


                  {Object.values(
                    Object.keys(data.gender[a]).filter((key, ind) => {
                      return data.gender[a][key]!==0;
                    })
                  ).length>0?
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
                      dataLabels: {
                        enabled: false,
                        offsetX: -6,
                        style: {
                          fontSize: '12px',
                          colors: ['#fff'],
                        },
                      },
                      labels: Object.values(data.options),
                      responsive: [
                        {
                          breakpoint: 1800,
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
                  />:<center>This filter does not have votes</center>}
                </div>
              ))}

            {data &&
              Object.keys(data).length > 0 &&
              data.poll.type === 'bar' &&
              gender.length > 0 &&
              gender.map((a) => (
                <div className="age">
                  <span style={{textTransform:"capitalize"}}>{a}</span>
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
                        enabled: false,
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
          </div>}
        { region.length>0 && <div className='region-div'>

            {data &&
              Object.keys(data).length > 0 &&
              data.poll.type === 'pie' &&
              region.length > 0 &&
              region.map((a) => (
                <div className="age">
                  <span style={{textTransform:"capitalize"}}>{a}</span>
                  {console.log(
                    Object.values(
                      Object.keys(data.region[a]).map((key, ind) => {
                        return data.region[a][key];
                      })
                    )
                  )}
                  {Object.values(
                    Object.keys(data.region[a]).filter((key, ind) => {
                      return data.region[a][key]!==0;
                    })
                  ).length>0?<ReactApexChart
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
                      dataLabels: {
                        enabled: false,
                        offsetX: -6,
                        style: {
                          fontSize: '12px',
                          colors: ['#fff'],
                        },
                      },
                      labels: Object.values(data.options),
                      responsive: [
                        {
                          breakpoint: 1800,
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
                  />:<center>This filter does not have any votes</center>}
                </div>
              ))}

            {data &&
              Object.keys(data).length > 0 &&
              data.poll.type === 'bar' &&
              region.length > 0 &&
              region.map((a) => (
                <div className="age">
                  <span style={{textTransform:"capitalize"}}>{a}</span>
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
                        enabled: false,
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
          </div>}
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  english: state.english,
});

export default connect(mapStateToProps)(Chart);
