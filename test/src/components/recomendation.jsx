import React, { useState, useEffect } from 'react';
import "./recomendation.css"
const Recommendationss = () => {
  const [data, setData] = useState(null);
console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ваш URL для GET-запроса
        const response = await fetch('http://localhost:3000/recomendationss');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
        console.log(result[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Пустой массив зависимостей означает, что useEffect будет запущен только один раз при монтировании компонента

  return (
    <div className='recom'>
      <h1>Size uygun ixtisaslar:</h1>

      <div class="flex-wrapper">
    <p  className="profesion">Kompüter elmləri</p>
  <div class="single-chart">
    <svg viewBox="0 0 36 36" class="circular-chart blue ">
      <path class="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path class="circle"
        stroke-dasharray="91, 100"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" class="percentage">91%</text>
    </svg>
  </div>
    <p className="profesion" >Kompüter mühəndisliyi</p>
  <div className="single-chart">
    <svg viewBox="0 0 36 36" class="circular-chart green ">
      <path class="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path class="circle"
        stroke-dasharray="82, 100"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" class="percentage">82%</text>
    </svg>
  </div>
    <p  className="profesion">İnformatika müəllimliyi</p>
  <div class="single-chart">
    <svg viewBox="0 0 36 36" class="circular-chart orange">
      <path class="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path class="circle"
        stroke-dasharray="75, 100"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" class="percentage">75%</text>
    </svg>
  </div>
  
  <p  className="profesion">İnformasiya təhlükəsizliyi</p>
  <div class="single-chart">

    <svg viewBox="0 0 36 36" class="circular-chart litlorange">
      <path class="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path class="circle"
        stroke-dasharray="60, 100"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" class="percentage">60%</text>
    </svg>
  </div>

  <p  className="profesion">Mexatronika və robototexnika mühəndisliyi</p>
  <div class="single-chart">

    <svg viewBox="0 0 36 36" class="circular-chart red">
      <path class="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path class="circle"
        stroke-dasharray="56, 100"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" class="percentage">56%</text>
    </svg>
  </div>
</div>









      {data ? (
        <div>
          {/* <h2>Answers:</h2> */}
          {/* <ul>
            {data.answers.map(answer => (
              <li key={answer.id}>
                <p>Group ID: {answer.groupId}</p>
                <p>Answer ID: {answer.id}</p>
              </li>
            ))}
          </ul> */}

          <h2>Recommendations:</h2>
         
          
  <ul>
    <li className='lll'>{data[0].body}</li>
  </ul>

  
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Recommendationss;
