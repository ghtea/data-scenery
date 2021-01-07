import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';


/*
https://velog.io/@velopert/react-testing-library

react-testing-library 에서는 리액트에서는 DOM 시뮬레이션을 위한 [JSDOM](https://github.com/jsdom/jsdom) 이라는 도구를 사용하여 document.body 에 리액트 컴포넌트를 렌더링합니다. clean-up-after-each 를 불러오면, 각 테스트 케이스가 끝날때마다 기존에 가상의 화면에 남아있는 UI 를 정리합니다.

추가적으로, 그 아래에는 jest-dom/extend-expect 를 불러와서 jest 에서 DOM 관련 matcher 를 사용 할 수 있게 해주었습니다.

*/