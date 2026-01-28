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

// Includes the description property
interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseDescription {
  // description: string;
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartBaseDescription {
  // description: string;
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends CoursePartBaseDescription {
  requirements: string[];
  kind: 'special';
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial; // Type union for all the types

interface PartProps {
  part: CoursePart;
}

// Helper function for exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part = ({ part }: PartProps) => {
  // const part = props.kind;
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>
            <em>{part.description}</em>
          </p>
        </div>
      );
    case 'group':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>
            <em>{part.description}</em>
          </p>
          <p> materials: {part.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h3>{part.name}</h3>
          <p>
            <em>{part.description}</em>
          </p>
          <p>required skills: {part.requirements}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Content = (props: ContentProps) => {
  return props.courseParts.map((part) => (
    <div key={part.name}>
      <Part part={part} />
    </div>
  ));
};

interface TotalProps {
  totalExercises: number;
}
const Total = (props: TotalProps) => {
  return <p>Number of exercises {props.totalExercises}</p>;
};

const App = () => {
  const courseName = 'Half Stack application development';

  const courseParts: CoursePart[] = [
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
      description: 'a hard part',
      kind: 'basic',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      kind: 'special',
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

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
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
