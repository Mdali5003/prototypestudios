import { useParams, Link } from "react-router-dom";
import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import CustomCursor from "@/components/CustomCursor";

interface Clip {
  id: number;
  src: string;
  title: string;
  link?: string;
}

interface Artist {
  name: string;
  subtitle: string;
  clips: Clip[];
}

const artists: Record<string, Artist> = {
  "mahmut-orhan": {
    name: "MAHMUT ORHAN",
    subtitle: "CENTRAL ASIA TOUR",
    clips: [
      { id: 1, src: "/mahmutorhan/mahmut-1.mp4", title: "MAHMUT ORHAN 1", link: "https://player.mediadelivery.net/play/626251/da8f2729-e563-468d-87c1-aa8b786d23ba" },
      { id: 2, src: "/mahmutorhan/mahmut-2.mp4", title: "MAHMUT ORHAN 2", link: "https://player.mediadelivery.net/play/626251/84a55271-f505-4c02-b687-83a9b79bd5c3" },
      { id: 3, src: "/mahmutorhan/mahmut-3.mp4", title: "MAHMUT ORHAN 3", link: "https://player.mediadelivery.net/play/626251/d594b406-b03d-48fb-aff7-6bc1c7a3ce89" },
      { id: 4, src: "/mahmutorhan/mahmut-4.mp4", title: "MAHMUT ORHAN 4", link: "https://player.mediadelivery.net/play/626251/274241f9-aac1-4d1b-954f-d20a74d3ce6a" },
      { id: 5, src: "/mahmutorhan/mahmut-5.mp4", title: "MAHMUT ORHAN 5", link: "https://player.mediadelivery.net/play/626251/058af243-2230-4f5f-aaca-e4a55d5e81d1" },
      { id: 6, src: "/mahmutorhan/mahmut-6.mp4", title: "MAHMUT ORHAN 6", link: "https://player.mediadelivery.net/play/626251/b2944fe6-6a8a-4c19-9625-7c52d15c03f4" },
      { id: 7, src: "/mahmutorhan/mahmut-7.mp4", title: "MAHMUT ORHAN 7", link: "https://player.mediadelivery.net/play/626251/557a4fc9-290b-4759-aa07-c06986a25bcd" },
      { id: 8, src: "/mahmutorhan/mahmut-8.mp4", title: "MAHMUT ORHAN 8", link: "https://player.mediadelivery.net/play/626251/5f3e116e-812b-4168-a22d-e9f43eeaaacd" },
      { id: 9, src: "/mahmutorhan/mahmut-9.mp4", title: "MAHMUT ORHAN 9", link: "https://player.mediadelivery.net/play/626251/8d4a482c-1dfa-4994-b8cf-024b167ede30" },
      { id: 10, src: "/mahmutorhan/mahmut-10.mp4", title: "MAHMUT ORHAN 10", link: "https://player.mediadelivery.net/play/626251/3718af8b-3bdb-4325-854e-d8375cd7a0c1" },
      { id: 11, src: "/mahmutorhan/reel-7.mp4", title: "REEL 7", link: "https://player.mediadelivery.net/play/626251/4b7ebb2e-7c03-41c0-9386-8d43b18abf3e" },
      { id: 12, src: "/mahmutorhan/reel-13.mp4", title: "REEL 13", link: "https://player.mediadelivery.net/play/626251/881a4ecc-7749-4f2a-a89e-c57239b3bef5" },
      { id: 13, src: "/mahmutorhan/reel-23.mp4", title: "REEL 23", link: "https://player.mediadelivery.net/play/626251/dc7caad2-dae0-433f-a581-a7cd7f33a069" },
      { id: 14, src: "/mahmutorhan/reel-26.mp4", title: "REEL 26", link: "https://player.mediadelivery.net/play/626251/ac8b1b62-9541-4f11-b896-016dbd0bdd18" },
    ],
  },
  "francis-mercier": {
    name: "FRANCIS MERCIER",
    subtitle: "SAVAYA BALI",
    clips: [
      { id: 1, src: "/francis-mercier/francis-mercier-1.mp4", title: "FRANCIS MERCIER 1" },
      { id: 2, src: "/francis-mercier/francis-mercier-2.mp4", title: "FRANCIS MERCIER 2" },
      { id: 3, src: "/francis-mercier/francis-mercier-3.mp4", title: "FRANCIS MERCIER 3" },
      { id: 4, src: "/francis-mercier/francis-mercier-4.mp4", title: "FRANCIS MERCIER 4" },
      { id: 5, src: "/francis-mercier/francis-mercier-5.mp4", title: "FRANCIS MERCIER 5" },
      { id: 6, src: "/francis-mercier/francis-mercier-6.mp4", title: "FRANCIS MERCIER 6" },
    ],
  },
  "aaron-sevilla": {
    name: "AARON SEVILLA",
    subtitle: "SAVAYA BALI",
    clips: [
      { id: 1, src: "/aaron-sevilla/aaron-sevilla-1.mp4", title: "AARON SEVILLA 1", link: "https://player.mediadelivery.net/play/626251/eb94fa40-e05a-4d7e-a190-3803bdb520f1" },
      { id: 2, src: "/aaron-sevilla/aaron-sevilla-2.mp4", title: "AARON SEVILLA 2", link: "https://player.mediadelivery.net/play/626251/b1a5b0ab-f359-413a-bd89-3fcd4ac9fda3" },
      { id: 3, src: "/aaron-sevilla/aaron-sevilla-3.mp4", title: "AARON SEVILLA 3", link: "https://player.mediadelivery.net/play/626251/169f64d7-4ed8-44de-97b7-47c2882341f2" },
      { id: 4, src: "/aaron-sevilla/aaron-sevilla-4.mp4", title: "AARON SEVILLA 4", link: "https://player.mediadelivery.net/play/626251/3e5f3f1e-94ef-4ee2-b80d-9d470b589f36" },
      { id: 5, src: "/aaron-sevilla/aaron-sevilla-5.mp4", title: "AARON SEVILLA 5", link: "https://player.mediadelivery.net/play/626251/19ddb2cb-ea05-4ca5-bad8-08dc864043f5" },
      { id: 6, src: "/aaron-sevilla/aaron-sevilla-6.mp4", title: "AARON SEVILLA 6", link: "https://player.mediadelivery.net/play/626251/fda37ff8-6b6b-4daa-8ac7-05a2cf3b73b2" },
    ],
  },
  "and-friends": {
    name: "&FRIENDS",
    subtitle: "SAVAYA BALI",
    clips: [
      { id: 1, src: "/and-friends/and-friends-1.mp4", title: "&FRIENDS 1" },
      { id: 2, src: "/and-friends/and-friends-2.mp4", title: "&FRIENDS 2" },
      { id: 3, src: "/and-friends/and-friends-3.mp4", title: "&FRIENDS 3" },
      { id: 4, src: "/and-friends/and-friends-4.mp4", title: "&FRIENDS 4" },
      { id: 5, src: "/and-friends/and-friends-5.mp4", title: "&FRIENDS 5" },
      { id: 6, src: "/and-friends/and-friends-6.mp4", title: "&FRIENDS 6" },
    ],
  },
  "hayden-james": {
    name: "HAYDEN JAMES",
    subtitle: "SAVAYA BALI",
    clips: [
      { id: 1, src: "/savaya/savaya-15.mp4", title: "HAYDEN JAMES 1", link: "https://player.mediadelivery.net/play/626251/581ce356-7f06-4244-b97f-b895e347524c" },
      { id: 2, src: "/hayden-james/hayden-james-1.mp4", title: "HAYDEN JAMES 2", link: "https://player.mediadelivery.net/play/626251/eb12708b-2dc6-404c-93df-87480859b086" },
      { id: 3, src: "/hayden-james/hayden-james-2.mp4", title: "HAYDEN JAMES 3", link: "https://player.mediadelivery.net/play/626251/e7995440-af10-41cd-a997-7e7bfdfb99a2" },
      { id: 4, src: "/hayden-james/hayden-james-3.mp4", title: "HAYDEN JAMES 4", link: "https://player.mediadelivery.net/play/626251/c06835cd-5d5c-4ac4-aafa-b92dc8f59291" },
    ],
  },
  moblack: {
    name: "MOBLACK",
    subtitle: "USHUAIA DUBAI HARBOUR",
    clips: [
      { id: 1, src: "/portfolio/sf-b3b-moblack.mp4", title: "MOBLACK 1", link: "https://player.mediadelivery.net/play/626251/82a1e26f-b954-4d40-bf67-0bdcec7e0013" },
      { id: 2, src: "/moblack/moblack-1.mp4", title: "MOBLACK 2", link: "https://player.mediadelivery.net/play/626251/463b9b1c-5a94-4670-a3a4-9b2e6f136773" },
      { id: 3, src: "/moblack/moblack-2.mp4", title: "MOBLACK 3", link: "https://player.mediadelivery.net/play/626251/69015552-726c-4a72-918c-41880526097b" },
      { id: 4, src: "/moblack/moblack-3.mp4", title: "MOBLACK 4", link: "https://player.mediadelivery.net/play/626251/edec2929-90c4-4605-a5e7-66bee4ed594a" },
      { id: 5, src: "/moblack/moblack-4.mp4", title: "MOBLACK 5", link: "https://player.mediadelivery.net/play/626251/171267ae-e6d4-44c3-aecd-e2879ee86133" },
      { id: 6, src: "/moblack/moblack-5.mp4", title: "MOBLACK 6", link: "https://player.mediadelivery.net/play/626251/f9703442-a618-44f0-8c14-5e106dbea489" },
    ],
  },
  "armnhmr": {
    name: "ARMNHMR",
    subtitle: "&FRIENDS FESTIVAL, MANILA",
    clips: [
      { id: 1, src: "/armnhmr/armnhmr-1.mp4", title: "ARMNHMR 1", link: "https://player.mediadelivery.net/play/626251/d99b59d7-8ae5-45c6-a6f5-0cdb0e8db28c" },
      { id: 2, src: "/armnhmr/armnhmr-2.mp4", title: "ARMNHMR 2", link: "https://player.mediadelivery.net/play/626251/187d4fa4-0cee-41d9-aa14-5a80815419dd" },
      { id: 3, src: "/armnhmr/armnhmr-3.mp4", title: "ARMNHMR 3", link: "https://player.mediadelivery.net/play/626251/7a7c1309-0a88-4a42-aed1-f21f19980c0a" },
      { id: 4, src: "/armnhmr/armnhmr-4.mp4", title: "ARMNHMR 4", link: "https://player.mediadelivery.net/play/626251/35660ec2-23ad-4da6-880e-f17ffa450802" },
    ],
  },
  "itschyll": {
    name: "ITSCHYLL",
    subtitle: "&FRIENDS FESTIVAL, MANILA",
    clips: [
      { id: 1, src: "/itschyll/itschyll-1.mp4", title: "ITSCHYLL 1", link: "https://player.mediadelivery.net/play/626251/dcc89e2c-a357-4268-aaed-6d1daa7a2d46" },
      { id: 2, src: "/itschyll/itschyll-2.mp4", title: "ITSCHYLL 2", link: "https://player.mediadelivery.net/play/626251/a2c9a8c4-c61b-4c0e-81cc-24d018282c6a" },
      { id: 3, src: "/itschyll/itschyll-3.mp4", title: "ITSCHYLL 3", link: "https://player.mediadelivery.net/play/626251/5da89ea6-005f-4c7b-92d2-f6d0a4e2f168" },
    ],
  },
  "amelie-lens": {
    name: "AMELIE LENS",
    subtitle: "SOHO GARDEN HIVE",
    clips: [
      { id: 1, src: "/amelie-lens/amelie-lens-1.mp4", title: "AMELIE LENS 1", link: "https://player.mediadelivery.net/play/626251/4d746b84-365c-44ba-bdeb-142cef1d26b0" },
      { id: 2, src: "/amelie-lens/amelie-lens-2.mp4", title: "AMELIE LENS 2", link: "https://player.mediadelivery.net/play/626251/e10ed7ed-2582-4901-a0ce-10f80a8e0611" },
      { id: 3, src: "/amelie-lens/amelie-lens-3.mp4", title: "AMELIE LENS 3", link: "https://player.mediadelivery.net/play/626251/ea19c292-d10b-41ff-a57e-7c6a2d8b86db" },
      { id: 4, src: "/amelie-lens/amelie-lens-4.mp4", title: "AMELIE LENS 4", link: "https://player.mediadelivery.net/play/626251/2320c658-277c-4c80-a17d-7134fb047e51" },
      { id: 5, src: "/amelie-lens/amelie-lens-5.mp4", title: "AMELIE LENS 5", link: "https://player.mediadelivery.net/play/626251/5f3f76e0-8708-4b06-9bf9-792fe9265fef" },
      { id: 6, src: "/amelie-lens/amelie-lens-6.mp4", title: "AMELIE LENS 6", link: "https://player.mediadelivery.net/play/626251/0e0352bc-96df-47d1-a7ab-d6eca35a8808" },
      { id: 7, src: "/amelie-lens/amelie-lens-7.mp4", title: "AMELIE LENS 7", link: "https://player.mediadelivery.net/play/626251/fcd8ad4c-90bb-4bf7-ad32-3fa0b5b1468c" },
    ],
  },
  "i-hate-models": {
    name: "I HATE MODELS",
    subtitle: "SOHO GARDEN HIVE",
    clips: [
      { id: 1, src: "/i-hate-models/i-hate-models-1.mp4", title: "I HATE MODELS 1", link: "https://player.mediadelivery.net/play/626251/639227dc-8731-45c2-bb56-8f0a658411d9" },
      { id: 2, src: "/i-hate-models/i-hate-models-2.mp4", title: "I HATE MODELS 2", link: "https://player.mediadelivery.net/play/626251/87fb8bac-6170-4980-8979-376df7ebd7a6" },
      { id: 3, src: "/i-hate-models/i-hate-models-3.mp4", title: "I HATE MODELS 3", link: "https://player.mediadelivery.net/play/626251/11702409-cd28-4d01-ad8c-6703c5d4e301" },
      { id: 4, src: "/i-hate-models/i-hate-models-4.mp4", title: "I HATE MODELS 4", link: "https://player.mediadelivery.net/play/626251/75c8fc24-7d54-4184-b7e4-b24bbba3aec8" },
      { id: 5, src: "/i-hate-models/i-hate-models-5.mp4", title: "I HATE MODELS 5", link: "https://player.mediadelivery.net/play/626251/0122df52-323c-43f1-bcec-44b4ae4c75cd" },
      { id: 6, src: "/i-hate-models/i-hate-models-6.mp4", title: "I HATE MODELS 6", link: "https://player.mediadelivery.net/play/626251/d8f8d2f2-5d9f-4fc1-ad3a-94268717cd63" },
    ],
  },
  "klangkuenstler": {
    name: "KLANGKUENSTLER",
    subtitle: "SOHO GARDEN HIVE",
    clips: [
      { id: 1, src: "/klangkuenstler/klangkuenstler-1.mp4", title: "KLANGKUENSTLER 1", link: "https://player.mediadelivery.net/play/626251/7b538577-4c47-4510-8549-29a095b4d9ba" },
      { id: 2, src: "/klangkuenstler/klangkuenstler-2.mp4", title: "KLANGKUENSTLER 2", link: "https://player.mediadelivery.net/play/626251/c2d5e3ac-5054-46ea-869c-0a2f06191c63" },
      { id: 3, src: "/klangkuenstler/klangkuenstler-3.mp4", title: "KLANGKUENSTLER 3", link: "https://player.mediadelivery.net/play/626251/009eb744-ab92-4878-b762-26df971ea8d2" },
      { id: 4, src: "/klangkuenstler/klangkuenstler-4.mp4", title: "KLANGKUENSTLER 4", link: "https://player.mediadelivery.net/play/626251/41012477-0f7e-4b6a-a9ce-9007b23df77d" },
      { id: 5, src: "/klangkuenstler/klangkuenstler-5.mp4", title: "KLANGKUENSTLER 5", link: "https://player.mediadelivery.net/play/626251/318ae7ee-e81f-47aa-9ab1-ca6436abff37" },
      { id: 6, src: "/klangkuenstler/klangkuenstler-6.mp4", title: "KLANGKUENSTLER 6", link: "https://player.mediadelivery.net/play/626251/4f74d6e1-b9a3-4f4b-b0ec-e218366b0a5b" },
      { id: 7, src: "/klangkuenstler/klangkuenstler-7.mp4", title: "KLANGKUENSTLER 7", link: "https://player.mediadelivery.net/play/626251/92512e13-828b-4f47-8366-b3e87e2b1120" },
      { id: 8, src: "/klangkuenstler/klangkuenstler-8.mp4", title: "KLANGKUENSTLER 8", link: "https://player.mediadelivery.net/play/626251/5f52e690-6e49-4498-bc0a-0dfb1fa0b9d0" },
      { id: 9, src: "/klangkuenstler/klangkuenstler-9.mp4", title: "KLANGKUENSTLER 9", link: "https://player.mediadelivery.net/play/626251/728c6346-217e-4d62-9aa9-da279e4d5da0" },
    ],
  },
  "lost-frequencies": {
    name: "LOST FREQUENCIES",
    subtitle: "BOHEMIA BY FIVE DUBAI",
    clips: [
      { id: 1, src: "/lost-frequencies/lost-frequencies-1.mp4", title: "LOST FREQUENCIES 1", link: "https://player.mediadelivery.net/play/626251/f319f45b-6a72-4eea-a79a-693510957c82" },
      { id: 2, src: "/lost-frequencies/lost-frequencies-2.mp4", title: "LOST FREQUENCIES 2", link: "https://player.mediadelivery.net/play/626251/fb29cd04-7a79-4892-b113-3f6d198aaeb3" },
      { id: 3, src: "/lost-frequencies/lost-frequencies-3.mp4", title: "LOST FREQUENCIES 3", link: "https://player.mediadelivery.net/play/626251/3ce0cb57-98f0-4d84-93b9-09c5532b578b" },
      { id: 4, src: "/lost-frequencies/lost-frequencies-4.mp4", title: "LOST FREQUENCIES 4", link: "https://player.mediadelivery.net/play/626251/dfa4ddf4-292d-4ebb-a59e-04b70e7cb02a" },
      { id: 5, src: "/lost-frequencies/lost-frequencies-5.mp4", title: "LOST FREQUENCIES 5", link: "https://player.mediadelivery.net/play/626251/5979533a-9c88-44d3-ad4a-5c328d9f9060" },
      { id: 6, src: "/lost-frequencies/lost-frequencies-6.mp4", title: "LOST FREQUENCIES 6", link: "https://player.mediadelivery.net/play/626251/c8ff3c55-9904-45ac-871a-e3d6b904e984" },
      { id: 7, src: "/lost-frequencies/lost-frequencies-7.mp4", title: "LOST FREQUENCIES 7", link: "https://player.mediadelivery.net/play/626251/3aaac5fe-b480-4763-b423-621d0b7edb99" },
      { id: 8, src: "/lost-frequencies/lost-frequencies-8.mp4", title: "LOST FREQUENCIES 8", link: "https://player.mediadelivery.net/play/626251/8d52edc1-ca0d-4e0d-93d3-deaefd3d534a" },
      { id: 9, src: "/lost-frequencies/lost-frequencies-9.mp4", title: "LOST FREQUENCIES 9", link: "https://player.mediadelivery.net/play/626251/b2e935e3-f3fd-4a54-b1f4-5d5d305fd600" },
      { id: 10, src: "/lost-frequencies/lost-frequencies-10.mp4", title: "LOST FREQUENCIES 10", link: "https://player.mediadelivery.net/play/626251/7c115897-0447-40a8-a3db-8ae560825b0b" },
      { id: 11, src: "/lost-frequencies/lost-frequencies-11.mp4", title: "LOST FREQUENCIES 11", link: "https://player.mediadelivery.net/play/626251/47b06a72-742b-4efe-8ec1-776989ef2ab7" },
      { id: 12, src: "/lost-frequencies/lost-frequencies-12.mp4", title: "LOST FREQUENCIES 12", link: "https://player.mediadelivery.net/play/626251/fc5b3492-986b-4a03-86de-1676257ac50f" },
      { id: 13, src: "/lost-frequencies/lost-frequencies-13.mp4", title: "LOST FREQUENCIES 13", link: "https://player.mediadelivery.net/play/626251/024ba2d5-aec1-49df-95aa-5240eb83de48" },
      { id: 14, src: "/lost-frequencies/lost-frequencies-14.mp4", title: "LOST FREQUENCIES 14", link: "https://player.mediadelivery.net/play/626251/547b1be8-a925-46e5-89ef-b9f63da5fd0f" },
      { id: 15, src: "/lost-frequencies/lost-frequencies-15.mp4", title: "LOST FREQUENCIES 15", link: "https://player.mediadelivery.net/play/626251/b2be66b9-f5ae-4324-868c-15aafd6a46ba" },
      { id: 16, src: "/lost-frequencies/lost-frequencies-16.mp4", title: "LOST FREQUENCIES 16", link: "https://player.mediadelivery.net/play/626251/9d39a2d4-fe49-412b-94e7-8666f9f1f02e" },
      { id: 17, src: "/lost-frequencies/lost-frequencies-17.mp4", title: "LOST FREQUENCIES 17", link: "https://player.mediadelivery.net/play/626251/fe2602eb-e473-48ac-9583-8c1f9277abb2" },
    ],
  },
  "honeyluv": {
    name: "HONEYLUV",
    subtitle: "MINISTRY OF SOUND, DUBAI",
    clips: [
      { id: 1, src: "/honeyluv/honeyluv-1.mp4", title: "HONEYLUV 1", link: "https://player.mediadelivery.net/play/626251/3cd3157d-5cfd-4ec7-bda0-95164e86725a" },
      { id: 2, src: "/honeyluv/honeyluv-2.mp4", title: "HONEYLUV 2", link: "https://player.mediadelivery.net/play/626251/97dc9197-2a4a-4a66-8612-b08605c46c3b" },
      { id: 3, src: "/honeyluv/honeyluv-3.mp4", title: "HONEYLUV 3", link: "https://player.mediadelivery.net/play/626251/5a155320-71ab-4e85-8334-10ad5c62e626" },
      { id: 4, src: "/honeyluv/honeyluv-4.mp4", title: "HONEYLUV 4", link: "https://player.mediadelivery.net/play/626251/a5930983-1a8d-4f72-adc0-5bea472a6374" },
      { id: 5, src: "/honeyluv/honeyluv-5.mp4", title: "HONEYLUV 5", link: "https://player.mediadelivery.net/play/626251/c687a266-a7c7-4d1b-993f-e866cc2140ec" },
    ],
  },
  "ignez": {
    name: "IGNEZ",
    subtitle: "",
    clips: [
      { id: 1, src: "/ignez/ignez-1.mp4", title: "IGNEZ 1", link: "https://player.mediadelivery.net/play/626251/378bf557-aea4-4ba6-9bf2-966bd802f933" },
      { id: 2, src: "/ignez/ignez-2.mp4", title: "IGNEZ 2", link: "https://player.mediadelivery.net/play/626251/7f285b52-c588-4f27-9d9e-26eb9f445165" },
      { id: 3, src: "/ignez/ignez-3.mp4", title: "IGNEZ 3", link: "https://player.mediadelivery.net/play/626251/9728c073-4e6d-4b06-ae7e-eb83d1f23ba8" },
      { id: 4, src: "/ignez/ignez-4.mp4", title: "IGNEZ 4", link: "https://player.mediadelivery.net/play/626251/790db578-12a6-4671-881f-a2987cd96c01" },
      { id: 5, src: "/ignez/ignez-5.mp4", title: "IGNEZ 5", link: "https://player.mediadelivery.net/play/626251/c208c817-2366-4873-b046-1b4aab74a65e" },
      { id: 6, src: "/ignez/ignez-6.mp4", title: "IGNEZ 6", link: "https://player.mediadelivery.net/play/626251/1bc4673a-32c8-411e-958a-0dadfaee716c" },
    ],
  },
  "kvision": {
    name: "KVISION",
    subtitle: "",
    clips: [
      { id: 1, src: "/kvision/kvision-1.mp4", title: "KVISION 1", link: "https://player.mediadelivery.net/play/626251/f54f3211-8ba6-4c7a-93ed-eaa72fe61835" },
      { id: 2, src: "/kvision/kvision-2.mp4", title: "KVISION 2", link: "https://player.mediadelivery.net/play/626251/1b2f52af-76f2-47a7-915b-51769e2d58a7" },
      { id: 3, src: "/kvision/kvision-3.mp4", title: "KVISION 3", link: "https://player.mediadelivery.net/play/626251/c7297210-62b0-4575-baf7-4005d2153de1" },
      { id: 4, src: "/kvision/kvision-4.mp4", title: "KVISION 4", link: "https://player.mediadelivery.net/play/626251/b443a552-efe5-4576-8bb3-4c8f7d236ba1" },
      { id: 5, src: "/kvision/kvision-5.mp4", title: "KVISION 5", link: "https://player.mediadelivery.net/play/626251/fd81c6d0-1ddc-4bb6-b34e-5090b209d80a" },
      { id: 6, src: "/kvision/kvision-6.mp4", title: "KVISION 6", link: "https://player.mediadelivery.net/play/626251/0be5542a-1867-4142-b006-d6124e2746c1" },
      { id: 7, src: "/kvision/kvision-7.mp4", title: "KVISION 7", link: "https://player.mediadelivery.net/play/626251/d8467140-0561-4a7d-ae78-597f972f7819" },
      { id: 8, src: "/kvision/kvision-8.mp4", title: "KVISION 8", link: "https://player.mediadelivery.net/play/626251/11341749-7088-4652-8598-658c7972337f" },
      { id: 9, src: "/kvision/kvision-9.mp4", title: "KVISION 9", link: "https://player.mediadelivery.net/play/626251/9f2a0f47-3d29-4274-ba4a-ddad9e65ef84" },
      { id: 10, src: "/kvision/kvision-10.mp4", title: "KVISION 10", link: "https://player.mediadelivery.net/play/626251/45569067-ebc6-4564-935d-c8e679853921" },
      { id: 11, src: "/kvision/kvision-11.mp4", title: "KVISION 11", link: "https://player.mediadelivery.net/play/626251/6e9dd5b6-ea78-4ce0-a4df-89b9053395a7" },
      { id: 12, src: "/kvision/kvision-12.mp4", title: "KVISION 12", link: "https://player.mediadelivery.net/play/626251/28afa7f2-4588-4ddc-aad4-2ae400582af6" },
      { id: 13, src: "/kvision/kvision-13.mp4", title: "KVISION 13", link: "https://player.mediadelivery.net/play/626251/c655ed5b-cf10-4d28-a3ca-90a4fad2c7c8" },
    ],
  },
  "vidojean": {
    name: "VIDOJEAN",
    subtitle: "INDIA TOUR",
    clips: [
      { id: 1, src: "/vidojean/vidojean-1.mp4", title: "VIDOJEAN 1", link: "https://player.mediadelivery.net/play/626251/b6cc5cc8-4535-46a7-946d-43155f82897e" },
      { id: 2, src: "/vidojean/vidojean-2.mp4", title: "VIDOJEAN 2", link: "https://player.mediadelivery.net/play/626251/1337c2c8-f31e-466c-a4a6-ea6b617dc7e5" },
      { id: 3, src: "/vidojean/vidojean-3.mp4", title: "VIDOJEAN 3", link: "https://player.mediadelivery.net/play/626251/a1229af4-b5e2-4989-adaa-e49c37f29cd8" },
      { id: 4, src: "/vidojean/vidojean-4.mp4", title: "VIDOJEAN 4", link: "https://player.mediadelivery.net/play/626251/97ecc52c-5535-4f65-b1c5-a39f72084f55" },
      { id: 5, src: "/vidojean/vidojean-5.mp4", title: "VIDOJEAN 5", link: "https://player.mediadelivery.net/play/626251/c769c312-509f-4ebe-8562-7bdd3e1c5bfd" },
      { id: 6, src: "/vidojean/vidojean-6.mp4", title: "VIDOJEAN 6", link: "https://player.mediadelivery.net/play/626251/1e56b4d8-598d-4330-b96b-bad5cc2a9a37" },
      { id: 7, src: "/vidojean/vidojean-7.mp4", title: "VIDOJEAN 7", link: "https://player.mediadelivery.net/play/626251/091ccb2e-db4c-468d-9812-eac78d080b6c" },
      { id: 8, src: "/vidojean/vidojean-8.mp4", title: "VIDOJEAN 8", link: "https://player.mediadelivery.net/play/626251/f62cc663-27d2-4b88-acb7-a351991d9c49" },
      { id: 9, src: "/vidojean/vidojean-9.mp4", title: "VIDOJEAN 9", link: "https://player.mediadelivery.net/play/626251/36067c34-4e37-4cb8-a890-9700fb1fa9d9" },
      { id: 10, src: "/vidojean/vidojean-10.mp4", title: "VIDOJEAN 10", link: "https://player.mediadelivery.net/play/626251/54ba0096-8fb7-47ba-ba4d-ef5f2f796f28" },
      { id: 11, src: "/vidojean/vidojean-11.mp4", title: "VIDOJEAN 11", link: "https://player.mediadelivery.net/play/626251/4b3ad9e9-49ef-4bb4-9b9c-66f3721716b7" },
    ],
  },
};

const ArtistDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loaded, setLoaded] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeEmbedId, setActiveEmbedId] = useState<number | null>(null);
  const artist = slug ? artists[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeId !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeId]);

  if (!artist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground font-body text-sm tracking-widest">ARTIST NOT FOUND</p>
      </div>
    );
  }

  const activeClip = artist.clips.find((c) => c.id === activeId) ?? null;

  return (
    <div
      className={`min-h-screen bg-background text-foreground transition-opacity duration-[1200ms] ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <CustomCursor />

      <nav className="fixed top-0 left-0 right-0 z-50 px-8 md:px-12 h-20 flex items-center justify-between">
        <Link
          to="/work"
          className="flex items-center gap-3 font-body text-[11px] tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          BACK
        </Link>
        <Link
          to="/"
          className="font-brand text-[11px] font-medium tracking-[0.3em] uppercase text-foreground"
        >
          PROTOTYPE MEDIA
        </Link>
      </nav>

      <header className="pt-20 md:pt-28 flex flex-col items-center justify-center relative pb-3 md:pb-4">
        <p className="font-body text-[8px] md:text-[10px] tracking-[0.3em] text-muted-foreground mb-1 md:mb-2">
          {artist.subtitle}
        </p>
        <h1
          className="font-display text-2xl md:text-5xl tracking-[0.04em] text-foreground text-center"
          style={{ fontWeight: 300 }}
        >
          {artist.name}
        </h1>
      </header>

      <section className="px-4 md:px-8 pb-12 md:pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {artist.clips.map((clip) => (
            <ClipCard
              key={clip.id}
              clip={clip}
              onOpenModal={() => setActiveId(clip.id)}
              activeEmbedId={activeEmbedId}
              setActiveEmbedId={setActiveEmbedId}
            />
          ))}
        </div>
      </section>

      {activeClip && (
        <div
          className="fixed inset-0 z-[60] bg-background/95 flex items-center justify-center"
          onClick={() => setActiveId(null)}
        >
          <button
            onClick={() => setActiveId(null)}
            className="absolute top-6 right-6 z-10 text-muted-foreground hover:text-foreground transition-colors"
            style={{ cursor: "pointer" }}
          >
            <X size={22} />
          </button>
          <video
            src={activeClip.src}
            className="max-h-[90vh] max-w-[90vw]"
            style={{ aspectRatio: "9 / 16" }}
            autoPlay
            controls
            playsInline
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

const ClipCard = ({
  clip,
  onOpenModal,
  activeEmbedId,
  setActiveEmbedId,
}: {
  clip: Clip;
  onOpenModal: () => void;
  activeEmbedId: number | null;
  setActiveEmbedId: (id: number | null) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const showEmbed = clip.link && activeEmbedId === clip.id;

  const handleClick = () => {
    if (clip.link) {
      setHovered(false);
      setActiveEmbedId(clip.id);
    } else {
      onOpenModal();
    }
  };

  if (showEmbed) {
    return (
      <div className="relative overflow-hidden aspect-[9/16]">
        <iframe
          src={clip.link}
          className="absolute inset-0 w-full h-full border-0 z-10"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ cursor: "default" }}
        />
        <button
          onClick={() => setActiveEmbedId(null)}
          className="absolute top-2 right-2 z-20 bg-background/70 rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
          style={{ cursor: "pointer" }}
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div
      data-cursor="expand"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden aspect-[9/16] cursor-pointer"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        src={clip.src}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
      />
      <div
        className={`absolute inset-0 bg-background/40 pointer-events-none transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <Play size={32} className="text-foreground fill-foreground/80" strokeWidth={1.5} />
      </div>
      <div className="absolute inset-0 flex items-end p-4 z-10 pointer-events-none">
        <p
          className={`font-body text-[10px] tracking-[0.3em] text-foreground transition-all duration-500 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {clip.title}
        </p>
      </div>
    </div>
  );
};

export default ArtistDetail;
