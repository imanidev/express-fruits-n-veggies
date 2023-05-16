// const React = require("react");

// class Index extends React.Component {
//   render() {
//     const { fruits } = this.props;
//     return (
//       <div>
//         <h1>Fruits Index Page</h1>
//         <ul>
//           {fruits.map((fruit, i) => {
//             return (
//               <li>
//                 The <a href={`/fruits/${fruit.id}`}>{fruit.name}</a> is{" "}
//                 {fruit.color} <br></br>
//                 {fruit.readyToEat
//                   ? `It is ready to eat`
//                   : `It is not ready to eat`}
//                 <br />
//               </li>
//             );
//           })}
//         </ul>
//         <nav>
//           <a href="/fruits/new">Create a New Fruit</a>
//         </nav>
//       </div>
//     );
//   }
// }
// module.exports = Index;

const React = require("react");
const DefaultLayout = require("../layout/Default");

class Index extends React.Component {
  render() {
    const fruits = this.props.fruits;
    return (
      <DefaultLayout title={"Fruits Index Page"}>
        <nav>
          <a href="/fruits/new">Create a New Fruit</a>
        </nav>
        <ul>
          {fruits.map((fruit) => {
            return (
              <li key={fruit._id}>
                The <a href={`/fruits/${fruit._id}`}>{fruit.name}</a> is{" "}
                {fruit.color} <br />
                {fruit.readyToEat
                  ? "  It is ready to eat"
                  : "  It is not ready to eat!"}
                <br />
                <a href={`/fruits/${fruit._id}/edit`}>Edit</a>
                <form
                  action={`/fruits/${fruit._id}?_method=DELETE`}
                  method="POST"
                >
                  <input type="submit" value="DELETE" />
                </form>
              </li>
            );
          })}
        </ul>
      </DefaultLayout>
    );
  }
}

module.exports = Index;
