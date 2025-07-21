import Image from "next/image";
import classes from "./techTag.module.css";
export default function TechTag({ name, img, alt ,classparent,webLink=null}) {
  function handdleclick(){
    webLink? window.open(webLink, '_blank'):null
  }
  return (
    <div className={`${classes.techTag} ${classparent}`} onClick={handdleclick}>
      <div>
        <Image src={img} alt={alt} />
        <p>{name}</p>
      </div>
    </div>
  );
}
