"use client";

import type { FC } from "react";
import { ImageAndMessage } from "./Element/ImageAndMessage";
import { useTalkWithGirl } from "@/hooks/TalkWithGirl.hooks";
import { InputMessage } from "./Element/InputMessage";
import type { GirlType } from "@/types/TalkWithGirl.type";

type PropsType = {
  girlMode: GirlType;
};

/**
 * 女の子全体を表示するコンポーネント.
 */
export const Girl: FC<PropsType> = ({ girlMode }) => {
  const {
    girlData,
    message,
    handleChange,
    talkWithGirl,
    resposneMessage,
    imageStatus,
    isDisabled,
  } = useTalkWithGirl();

  return (
    <>
      <ImageAndMessage
        imageStatus={imageStatus}
        resposneMessage={resposneMessage}
        girlMode={girlMode}
        girlName={girlData[girlMode]}
      />
      <InputMessage handleChange={handleChange} />
      <button
        disabled={isDisabled}
        onClick={() => talkWithGirl(message, girlMode)}
        className="hover:opacity-[30%]"
      >
        {girlData[girlMode]}にメッセを送る
      </button>
    </>
  );
};
