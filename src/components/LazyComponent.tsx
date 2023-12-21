import React, { FunctionComponent } from "react";

// LazyComponent 컴포넌트 정의
const LazyComponent: FunctionComponent = () => {
  console.log("LazyComponentLazyComponentLazyComponent");
  return (
    <div>
      <h1>Lazy Loaded Component</h1>
      <p>This component was loaded asynchronously!</p>
    </div>
  );
};

export default LazyComponent;
