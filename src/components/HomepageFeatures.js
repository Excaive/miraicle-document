import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: '轻量',
    Svg: require('../../static/img/home.svg').default,
    description: (
      <p align='left'>
        基于 <code>mirai-api-http</code> 的微框架，小巧灵活，易于上手。
      </p>
    ),
  },
  {
    title: '自由',
    Svg: require('../../static/img/forest.svg').default,
    description: (
      <p align='left'>
        用哪一种方式与 <code>mirai-api-http</code> 通信，用同步还是异步，由你决定。
      </p>
    ),
  },
  {
    title: '可扩展',
    Svg: require('../../static/img/iceberg.svg').default,
    description: (
      <p align='left'>
        接收器和过滤器的设计，让你可以用更简洁、更 <code>pythonic</code> 的方法编写复杂逻辑。
      </p>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
