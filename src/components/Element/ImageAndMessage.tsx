import type { GirlType } from "@/types/TalkWithGirl.type";
import Image from "next/image";
import type { FC } from "react";

type PropsType = {
  /**
   * 画像の状態.
   */
  imageStatus: "default" | "thinking" | "talking";
  /**
   * AIから返ってくるメッセージ.
   */
  resposneMessage: string | undefined;
  /**
   * 女の子のモード.
   */
  girlMode: GirlType;
  /**
   * 女の子の日本語表記.
   */
  girlName: "ギャル";
};

/**
 * 画像とAIからのメッセージを表示するコンポーネント.
 */
export const ImageAndMessage: FC<PropsType> = ({
  imageStatus,
  resposneMessage,
  girlMode,
  girlName,
}) => {
  return (
    <>
      <figure>
        {imageStatus === "default" && (
          <Image
            src={`/${girlMode}_default.GIF`}
            width={300}
            height={300}
            alt={`通常時の${girlName}`}
          />
        )}
        {imageStatus === "thinking" && (
          <Image
            src={`/${girlMode}_thinking.PNG`}
            width={300}
            height={300}
            alt={`考え中の${girlName}`}
          />
        )}

        {imageStatus === "talking" && (
          <Image
            src={`/${girlMode}_talking.GIF`}
            width={300}
            height={300}
            alt={`話し中の${girlName}`}
          />
        )}
      </figure>

      {resposneMessage}
    </>
  );
};
