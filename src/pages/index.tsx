import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
// import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';
import Translate from '@docusaurus/Translate';
import prototypeImage from '@site/static/img/prototype1.png';
import pointcloud from '@site/static/img/pointcloud.png';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--4')}>
            <img src={prototypeImage} alt="Prototype" />
          </div>
          <div className={clsx('col col--8')}>
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">
              <Translate id="home.subtitle">
                On-machine 3D Scanner CMM
              </Translate>
            </p>

            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/blog">
                  <Translate id="home.latestUpdates">
                    Check Out Our Latest Updates
                </Translate>
              </Link>
            </div>
            <div className={styles.buttons}>
              <Link
                className="button button--lg"
                to="https://www.youtube.com/@OpenCMM">
                YouTube
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function AutomaticScan() {
  return (
    <div className={clsx('hero hero--secondary', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--5')}>
            <h2>
              <Translate id="home.automaticScan.title" >
                Automatic Scan
              </Translate>
            </h2>
          </div>
          <div className={clsx('col col--5')}>
            <Translate id="home.automaticScan.description" >
              OpenCMM automatically scans the workpiece after the machining process, reducing measurement time and enhancing measurement accuracy.
            </Translate>
          </div>
        </div>
      </div>
    </div>
  );
}

function Accuracy() {
  return (
    <div className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--5')}>
            <h2>
              <Translate id="home.accuracy.title" >
                50µm Accuracy
              </Translate>
            </h2>
            <Translate id="home.accuracy.description" >
              While 3D scanners are generally less accurate than touch probes, OpenCMM will provide enough accuracy to check if the workpiece meets the general machining tolerance.
            </Translate>
          </div>
          <div className={clsx('col col--5')}>
            <img src={pointcloud} alt="PointCloud" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportingMachines() {
  return (
    <div className={clsx('hero hero--secondary', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--5')}>
            <h2>
              <Translate id="home.supportingMachines.title" >
                Universal Compatibility
              </Translate>
            </h2>
          </div>
          <div className={clsx('col col--5')}>
            <Translate id="home.supportingMachines.description" >
              OpenCMM is compatible with any CNC machine, requiring no wiring or modifications. It seamlessly integrates with 3-axis and 5-axis machines, as well as machines from any brand.
            </Translate>
          </div>
        </div>
      </div>
    </div>
  );
}



function Vision() {
  return (
    <div className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--5')}>
            <h2>
              <Translate id="home.vision.title" >
                Our Vision
              </Translate>
            </h2>
          </div>
          <div className={clsx('col col--5')}>
            <Translate id="home.vision.description" >
              Our vision is to advance the automation of manufacturing processes for small and medium-sized machine shops. 
              Unlike large-scale mass production, these shops handle a diverse range of workpieces and 
              engage in low-volume production, posing challenges for automation. 
              Particularly, they invest significant time in the measurement process compared to mass production. 
              Our goal is to address this by offering an affordable and user-friendly 3D scanner solution.
            </Translate>
          </div>
        </div>
      </div>
    </div>
  );
}

function DevelopmentStatus() {
  return (
    <div className={clsx('hero hero--secondary', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--5')}>
            <h2>
              <Translate id="home.devStatus.title" >
                Development Status
              </Translate>
            </h2>
            <p>
              <Translate id="home.devStatus.description" >
                Follow our development status on GitHub and YouTube.
              </Translate>
            </p>
          </div>
          <div className={clsx('col col--7')}>
            <div className="row">
              <div className={clsx('col col--2')}>
                <Translate id="home.devStatus.prototype" >
                  Prototype
                  </Translate>
              </div>
              <div className={clsx('col col--2')}>x</div>
            </div>
            <div className="row">
              <div className={clsx('col col--2')}>
                <Translate id="home.devStatus.forSale" >
                  For Sale
                  </Translate>
              </div>
              <div className={clsx('col col--2')}>x</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <AutomaticScan />
        <Accuracy />
        <SupportingMachines />
        <Vision />
        {/* <HomepageFeatures /> */}
        <DevelopmentStatus />
      </main>
    </Layout>
  );
}
