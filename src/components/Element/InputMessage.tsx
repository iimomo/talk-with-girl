import { FC } from "react";

type PropsType = {
  /**
   * 入力テキストを変数に格納するメソッド.
   */
  handleChange: (inputText: string) => void;
};

/**
 * テキスト入力のコンポーネント.
 */
export const InputMessage: FC<PropsType> = ({ handleChange }) => {
  return (
    <input
      type="text"
      className="border w-[80%]"
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};
