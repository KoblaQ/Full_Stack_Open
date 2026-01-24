interface HeaderProps {
  courseName: string;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>;
};

interface ContentProps {
  courseParts: CoursePart[];
}

// interface CoursePart {
//   name: string;
//   exerciseCount: number;
// }

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartBasic extends CoursePartBase {
  // name: string;
  // exerciseCount: number;
  description: string;
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  // name: string;
  // exerciseCount: number;
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackgrond extends CoursePartBase {
  // name: string;
  // exerciseCount: number;
  description: string;
  backgroundMaterial: string;
  kind: 'background';
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackgrond; // Type union for all the types

const Content = (props: ContentProps) => {
  return props.courseParts.map((part) => (
    <p key={part.name}>
      {part.name} {part.exerciseCount}
    </p>
  ));
};

// Helper function for exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface TotalProps {
  totalExercises: number;
}
const Total = (props: TotalProps) => {
  return <p>Number of exercises {props.totalExercises}</p>;
};

const App = () => {
  const courseName = 'Half Stack application development';

  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group',
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial:
        'https://type-level-typescript.com/template-literal-types',
      kind: 'background',
    },
    {
      name: 'TypeScript in frontend',
      exerciseCount: 10,
      kind: 'basic',
    },
  ];
  // const courseParts = [
  //   {
  //     name: 'Fundamentals',
  //     exerciseCount: 10,
  //   },
  //   {
  //     name: 'Using props to pass data',
  //     exerciseCount: 7,
  //   },
  //   {
  //     name: 'Deeper type usage',
  //     exerciseCount: 14,
  //   },
  // ];

  courseParts.forEach((part) => {
    switch (part.kind) {
      case 'basic':
        console.log(part.description);
        break;
      case 'group':
        console.log(part.groupProjectCount);
        break;
      case 'background':
        console.log(part.backgroundMaterial);
        break;
      default:
        return assertNever(part);
        break;
    }
  });

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header courseName={courseName} />

      <Content courseParts={courseParts} />

      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
