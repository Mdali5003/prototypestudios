import { useParams, Link } from "react-router-dom";
import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import CustomCursor from "@/components/CustomCursor";

interface Clip {
  id: number;
  src: string;
  title: string;
  type?: "video" | "photo";
  link?: string;
}

interface Club {
  name: string;
  subtitle: string;
  clips: Clip[];
  columns?: number;
  titleFirst?: boolean;
}

const clubs: Record<string, Club> = {
  atlassuperclub: {
    name: "ATLAS SUPER CLUB",
    subtitle: "BALI",
    clips: [
      { id: 1, src: "/atlassuperclub/atlassuperclub-1.mp4", title: "HENRY FONG 1" },
      { id: 2, src: "/atlassuperclub/atlassuperclub-2.mp4", title: "HENRY FONG 2" },
      { id: 3, src: "/atlassuperclub/atlassuperclub-3.mp4", title: "SYLK 1" },
      { id: 4, src: "/atlassuperclub/atlassuperclub-4.mp4", title: "SYLK 2" },
      { id: 5, src: "/atlassuperclub/atlassuperclub-5.mp4", title: "FIREBEATZ 1" },
      { id: 6, src: "/atlassuperclub/atlassuperclub-6.mp4", title: "FIREBEATZ 2" },
    ],
  },
  "ushuaia-dubai-harbour": {
    name: "USHUAIA",
    subtitle: "DUBAI HARBOUR",
    columns: 3,
    clips: [
      { id: 1, src: "/ushuaia-dubai-harbour/ushuaia-1.png", title: "USHUAIA 1", type: "photo" },
      { id: 2, src: "/ushuaia-dubai-harbour/ushuaia-2.png", title: "USHUAIA 2", type: "photo" },
      { id: 3, src: "/ushuaia-dubai-harbour/ushuaia-3.png", title: "USHUAIA 3", type: "photo" },
      { id: 4, src: "/ushuaia-dubai-harbour/ushuaia-4.mp4", title: "USHUAIA 4", type: "video" },
      { id: 5, src: "/ushuaia-dubai-harbour/ushuaia-5.mp4", title: "USHUAIA 5", type: "video" },
      { id: 6, src: "/ushuaia-dubai-harbour/ushuaia-6.mp4", title: "USHUAIA 6", type: "video" },
      { id: 7, src: "/ushuaia-dubai-harbour/ushuaia-7.mp4", title: "USHUAIA 7", type: "video" },
      { id: 8, src: "/ushuaia-dubai-harbour/ushuaia-8.mp4", title: "USHUAIA 8", type: "video" },
      { id: 9, src: "/ushuaia-dubai-harbour/ushuaia-9.mp4", title: "USHUAIA 9", type: "video" },
    ],
  },
  savaya: {
    name: "SAVAYA",
    subtitle: "BALI",
    titleFirst: true,
    clips: [
      { id: 1, src: "/savaya/savaya-1.mp4", title: "&FRIENDS 1", link: "https://player.mediadelivery.net/play/626251/9cfb6945-c236-4718-ae00-6cb09586328c" },
      { id: 2, src: "/savaya/savaya-2.mp4", title: "&FRIENDS 2", link: "https://player.mediadelivery.net/play/626251/715e1fcd-c630-4ffc-afaf-c68ee2c81230" },
      { id: 3, src: "/savaya/savaya-3.mp4", title: "&FRIENDS 3", link: "https://player.mediadelivery.net/play/626251/59537903-4f21-44f0-961e-2cd956a72c6c" },
      { id: 4, src: "/savaya/savaya-4.mp4", title: "ESTA COBARDÍA — AARON SEVILLA, P RIVAS & OLIVER GIL", link: "https://player.mediadelivery.net/play/626251/fda37ff8-6b6b-4daa-8ac7-05a2cf3b73b2" },
      { id: 6, src: "/savaya/savaya-6.mp4", title: "FAVELA — AARON SEVILLA & ARKAD3", link: "https://player.mediadelivery.net/play/626251/eb94fa40-e05a-4d7e-a190-3803bdb520f1" },
      { id: 7, src: "/savaya/savaya-7.mp4", title: "FRANCIS MERCIER 9", link: "https://player.mediadelivery.net/play/626251/6f520f49-d0e3-4fcb-b51f-a3ac4026f14f" },
      { id: 8, src: "/savaya/savaya-8.mp4", title: "FRANCIS MERCIER — SAVAYA", link: "https://player.mediadelivery.net/play/626251/f5dae8f6-6d4d-4d44-82ae-7c366a2da111" },
      { id: 9, src: "/savaya/savaya-9.mp4", title: "FRANCIS MERCIER — SAVAYA 2", link: "https://player.mediadelivery.net/play/626251/d30f9436-3e02-4908-969d-f580e0ee55b9" },
      { id: 10, src: "/savaya/savaya-10.mp4", title: "ID", link: "https://player.mediadelivery.net/play/626251/3e5f3f1e-94ef-4ee2-b80d-9d470b589f36" },
      { id: 11, src: "/savaya/savaya-11.mp4", title: "&FRIENDS — REEL 9", link: "https://player.mediadelivery.net/play/626251/f0ac4165-f3cd-4606-8683-d3d38af1e253" },
      { id: 12, src: "/savaya/savaya-12.mp4", title: "AARON SEVILLA — REEL 11", link: "https://player.mediadelivery.net/play/626251/8ad4c5b5-b99c-4416-8dab-5b575441ad74" },
      { id: 13, src: "/savaya/savaya-13.mp4", title: "AARON SEVILLA — REEL 14", link: "https://player.mediadelivery.net/play/626251/82d8bb8a-f8bf-4ff3-bc16-fc523ab27cbb" },
      { id: 14, src: "/savaya/savaya-14.mp4", title: "&FRIENDS — REEL 14", link: "https://player.mediadelivery.net/play/626251/0ea2e168-77d4-46da-be94-2c1cc2899c63" },
      { id: 15, src: "/savaya/savaya-15.mp4", title: "HAYDEN JAMES", link: "https://player.mediadelivery.net/play/626251/581ce356-7f06-4244-b97f-b895e347524c" },
      { id: 16, src: "/savaya/savaya-16.mp4", title: "&FRIENDS — REEL 15", link: "https://player.mediadelivery.net/play/626251/bf299823-a72d-4c1c-9201-c1d5f39c8f9b" },
      { id: 17, src: "/savaya/savaya-17.mp4", title: "AARON SEVILLA — REEL 17", link: "https://player.mediadelivery.net/play/626251/2eb256bc-53bd-4fdc-a2f1-625bbd6e34a2" },
      { id: 18, src: "/savaya/savaya-18.mp4", title: "TIC TAC — AARON SEVILLA, FLAVOUR PLUS & FRAN PEREZ", link: "https://player.mediadelivery.net/play/626251/169f64d7-4ed8-44de-97b7-47c2882341f2" },
      { id: 19, src: "/savaya/savaya-19.mp4", title: "TUTTO BENE — AARON SEVILLA, BENY JUNIOR & SAHAR SAX", link: "https://player.mediadelivery.net/play/626251/19ddb2cb-ea05-4ca5-bad8-08dc864043f5" },
    ],
  },
  "soho-garden": {
    name: "SOHO GARDEN",
    subtitle: "DUBAI",
    clips: [
      { id: 1, src: "/amelie-lens/amelie-lens-1.mp4", title: "AMELIE LENS 1", link: "https://player.mediadelivery.net/play/626251/4d746b84-365c-44ba-bdeb-142cef1d26b0" },
      { id: 2, src: "/amelie-lens/amelie-lens-2.mp4", title: "AMELIE LENS 2", link: "https://player.mediadelivery.net/play/626251/e10ed7ed-2582-4901-a0ce-10f80a8e0611" },
      { id: 3, src: "/amelie-lens/amelie-lens-3.mp4", title: "AMELIE LENS 3", link: "https://player.mediadelivery.net/play/626251/ea19c292-d10b-41ff-a57e-7c6a2d8b86db" },
      { id: 4, src: "/amelie-lens/amelie-lens-4.mp4", title: "AMELIE LENS 4", link: "https://player.mediadelivery.net/play/626251/2320c658-277c-4c80-a17d-7134fb047e51" },
      { id: 5, src: "/amelie-lens/amelie-lens-5.mp4", title: "AMELIE LENS 5", link: "https://player.mediadelivery.net/play/626251/5f3f76e0-8708-4b06-9bf9-792fe9265fef" },
      { id: 6, src: "/amelie-lens/amelie-lens-6.mp4", title: "AMELIE LENS 6", link: "https://player.mediadelivery.net/play/626251/0e0352bc-96df-47d1-a7ab-d6eca35a8808" },
      { id: 7, src: "/amelie-lens/amelie-lens-7.mp4", title: "AMELIE LENS 7", link: "https://player.mediadelivery.net/play/626251/fcd8ad4c-90bb-4bf7-ad32-3fa0b5b1468c" },
      { id: 8, src: "/i-hate-models/i-hate-models-1.mp4", title: "I HATE MODELS 1", link: "https://player.mediadelivery.net/play/626251/639227dc-8731-45c2-bb56-8f0a658411d9" },
      { id: 9, src: "/i-hate-models/i-hate-models-2.mp4", title: "I HATE MODELS 2", link: "https://player.mediadelivery.net/play/626251/87fb8bac-6170-4980-8979-376df7ebd7a6" },
      { id: 10, src: "/i-hate-models/i-hate-models-3.mp4", title: "I HATE MODELS 3", link: "https://player.mediadelivery.net/play/626251/11702409-cd28-4d01-ad8c-6703c5d4e301" },
      { id: 11, src: "/i-hate-models/i-hate-models-4.mp4", title: "I HATE MODELS 4", link: "https://player.mediadelivery.net/play/626251/75c8fc24-7d54-4184-b7e4-b24bbba3aec8" },
      { id: 12, src: "/i-hate-models/i-hate-models-5.mp4", title: "I HATE MODELS 5", link: "https://player.mediadelivery.net/play/626251/0122df52-323c-43f1-bcec-44b4ae4c75cd" },
      { id: 13, src: "/i-hate-models/i-hate-models-6.mp4", title: "I HATE MODELS 6", link: "https://player.mediadelivery.net/play/626251/d8f8d2f2-5d9f-4fc1-ad3a-94268717cd63" },
      { id: 14, src: "/klangkuenstler/klangkuenstler-1.mp4", title: "KLANGKUENSTLER 1", link: "https://player.mediadelivery.net/play/626251/7b538577-4c47-4510-8549-29a095b4d9ba" },
      { id: 15, src: "/klangkuenstler/klangkuenstler-2.mp4", title: "KLANGKUENSTLER 2", link: "https://player.mediadelivery.net/play/626251/c2d5e3ac-5054-46ea-869c-0a2f06191c63" },
      { id: 16, src: "/klangkuenstler/klangkuenstler-3.mp4", title: "KLANGKUENSTLER 3", link: "https://player.mediadelivery.net/play/626251/009eb744-ab92-4878-b762-26df971ea8d2" },
      { id: 17, src: "/klangkuenstler/klangkuenstler-4.mp4", title: "KLANGKUENSTLER 4", link: "https://player.mediadelivery.net/play/626251/41012477-0f7e-4b6a-a9ce-9007b23df77d" },
      { id: 18, src: "/klangkuenstler/klangkuenstler-5.mp4", title: "KLANGKUENSTLER 5", link: "https://player.mediadelivery.net/play/626251/318ae7ee-e81f-47aa-9ab1-ca6436abff37" },
      { id: 19, src: "/klangkuenstler/klangkuenstler-6.mp4", title: "KLANGKUENSTLER 6", link: "https://player.mediadelivery.net/play/626251/4f74d6e1-b9a3-4f4b-b0ec-e218366b0a5b" },
      { id: 20, src: "/klangkuenstler/klangkuenstler-7.mp4", title: "KLANGKUENSTLER 7", link: "https://player.mediadelivery.net/play/626251/92512e13-828b-4f47-8366-b3e87e2b1120" },
      { id: 21, src: "/klangkuenstler/klangkuenstler-8.mp4", title: "KLANGKUENSTLER 8", link: "https://player.mediadelivery.net/play/626251/5f52e690-6e49-4498-bc0a-0dfb1fa0b9d0" },
      { id: 22, src: "/klangkuenstler/klangkuenstler-9.mp4", title: "KLANGKUENSTLER 9", link: "https://player.mediadelivery.net/play/626251/728c6346-217e-4d62-9aa9-da279e4d5da0" },
    ],
  },
  "pacha-icons-dubai": {
    name: "PACHA ICONS",
    subtitle: "DUBAI",
    clips: [
      { id: 1, src: "/carl-cox/carl-cox-1.mp4", title: "CARL COX 1", link: "https://player.mediadelivery.net/play/626251/6f31517a-b0a4-49d7-94e3-517c307017a0" },
      { id: 2, src: "/carl-cox/carl-cox-2.mp4", title: "CARL COX 2", link: "https://player.mediadelivery.net/play/626251/a89ea7ce-07dd-4323-ab45-95dd7305d4f2" },
      { id: 3, src: "/carl-cox/carl-cox-5.mp4", title: "CARL COX 3", link: "https://player.mediadelivery.net/play/626251/e2d2dc69-b55f-403f-9c94-bb87689dd23e" },
      { id: 4, src: "/carl-cox/carl-cox-7.mp4", title: "CARL COX 4", link: "https://player.mediadelivery.net/play/626251/0c48a53f-1556-4526-bb63-e4767456c5e3" },
      { id: 5, src: "/carl-cox/carl-cox-9.mp4", title: "CARL COX 5", link: "https://player.mediadelivery.net/play/626251/090eb790-bd52-44db-82e1-201e8074ede5" },
      { id: 6, src: "/carl-cox/carl-cox-12.mp4", title: "CARL COX 6", link: "https://player.mediadelivery.net/play/626251/f962dc2e-6e47-489c-aa44-c16452a05f05" },
      { id: 7, src: "/carl-cox/carl-cox-13.mp4", title: "CARL COX 7", link: "https://player.mediadelivery.net/play/626251/b0103044-1fd6-4f5e-88ce-918ad6b9eabd" },
      { id: 8, src: "/carl-cox/carl-cox-15.mp4", title: "CARL COX 8", link: "https://player.mediadelivery.net/play/626251/075bdc74-3bd9-416d-8055-4123579c4944" },
    ],
  },
  "bohemia-by-five-dubai": {
    name: "BOHEMIA BY FIVE",
    subtitle: "DUBAI",
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
      { id: 18, src: "/robin-schulz/robin-schulz-1.mp4", title: "ROBIN SCHULZ 1", link: "https://player.mediadelivery.net/play/626251/046f8943-90fc-4748-837e-384eac7cce14" },
      { id: 19, src: "/robin-schulz/robin-schulz-2.mp4", title: "ROBIN SCHULZ 2", link: "https://player.mediadelivery.net/play/626251/e817740e-9cfb-43c3-b8c7-8a58fe9f13df" },
      { id: 20, src: "/robin-schulz/robin-schulz-6.mp4", title: "ROBIN SCHULZ 3", link: "https://player.mediadelivery.net/play/626251/39766dba-6e22-4d69-a85f-651ad4b49dee" },
      { id: 21, src: "/robin-schulz/robin-schulz-7.mp4", title: "ROBIN SCHULZ 4", link: "https://player.mediadelivery.net/play/626251/6e39fb47-c11b-491c-b976-c83c859c03ba" },
      { id: 22, src: "/robin-schulz/robin-schulz-9.mp4", title: "ROBIN SCHULZ 5", link: "https://player.mediadelivery.net/play/626251/d25f088d-4da8-4261-8929-d7bb1c901ce9" },
      { id: 23, src: "/robin-schulz/robin-schulz-10.mp4", title: "ROBIN SCHULZ 6", link: "https://player.mediadelivery.net/play/626251/182e5374-0616-403c-b3ef-7ab1f7a23fea" },
      { id: 24, src: "/robin-schulz/robin-schulz-11.mp4", title: "ROBIN SCHULZ 7", link: "https://player.mediadelivery.net/play/626251/72b1095b-bd02-46a7-b48b-eddf4fedf5bc" },
      { id: 25, src: "/robin-schulz/robin-schulz-14.mp4", title: "ROBIN SCHULZ 8", link: "https://player.mediadelivery.net/play/626251/2070db35-1a76-4d56-9632-aeec8619d2ae" },
      { id: 26, src: "/robin-schulz/robin-schulz-15.mp4", title: "ROBIN SCHULZ 9", link: "https://player.mediadelivery.net/play/626251/37482d05-0b45-4a72-8d0d-d886d39ed6da" },
    ],
  },
};

const ClubDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loaded, setLoaded] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const club = slug ? clubs[slug] : null;

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

  if (!club) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground font-body text-sm tracking-widest">CLUB NOT FOUND</p>
      </div>
    );
  }

  const activeClip = club.clips.find((c) => c.id === activeId && c.type !== "photo") ?? null;
  const gridCols = club.columns ?? 4;

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
        {club.titleFirst ? (
          <>
            <h1
              className="font-display text-2xl md:text-5xl tracking-[0.04em] text-foreground text-center mb-1 md:mb-2"
              style={{ fontWeight: 300 }}
            >
              {club.name}
            </h1>
            <p className="font-body text-[8px] md:text-[10px] tracking-[0.3em] text-muted-foreground">
              {club.subtitle}
            </p>
          </>
        ) : (
          <>
            <p className="font-body text-[8px] md:text-[10px] tracking-[0.3em] text-muted-foreground mb-1 md:mb-2">
              {club.subtitle}
            </p>
            <h1
              className="font-display text-2xl md:text-5xl tracking-[0.04em] text-foreground text-center"
              style={{ fontWeight: 300 }}
            >
              {club.name}
            </h1>
          </>
        )}
      </header>

      <section className="px-4 md:px-8 pb-12 md:pb-24">
        <div
          className={`grid gap-2 ${
            gridCols === 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4"
          }`}
        >
          {club.clips.map((clip) =>
            clip.type === "photo" ? (
              <PhotoCard key={clip.id} clip={clip} square={gridCols === 3} />
            ) : (
              <ClipCard
                key={clip.id}
                clip={clip}
                square={gridCols === 3}
                onOpen={() => setActiveId(clip.id)}
              />
            )
          )}
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
          {activeClip.link ? (
            <iframe
              src={activeClip.link}
              className="w-[90vw] h-[90vh] max-w-[500px] border-0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              src={activeClip.src}
              className="max-h-[90vh] max-w-[90vw]"
              autoPlay
              controls
              playsInline
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </div>
  );
};

const ClipCard = ({
  clip,
  onOpen,
  square,
}: {
  clip: Clip;
  onOpen: () => void;
  square?: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-cursor="expand"
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden cursor-pointer ${square ? "aspect-square" : "aspect-[9/16]"}`}
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

const PhotoCard = ({ clip, square }: { clip: Clip; square?: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-cursor="expand"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden ${square ? "aspect-square" : "aspect-[3/4]"}`}
    >
      <img
        src={clip.src}
        alt={clip.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
      />
      <div
        className={`absolute inset-0 bg-background/20 transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />
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

export default ClubDetail;
