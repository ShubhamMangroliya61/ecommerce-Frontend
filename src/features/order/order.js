import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return <></>;
}
