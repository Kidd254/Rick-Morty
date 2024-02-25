import Layout from './Layout';
import List from '../components/List';


const Rockets = () => {

  return (
    <Layout>
      <section id="rockets">
        <div className="container">
          <List />
        </div>
      </section>
    </Layout>
  );
};

export default Rockets;