import Image from "next/image";
import classes from "./techTag.module.css";
export default function TechTag({ name, img, alt ,classparent}) {
  return (
    <div className={`${classes.techTag} ${classparent}`}>
      <div>
        <Image src={img} alt={alt} />
        <p>{name}</p>
      </div>
    </div>
  );
}
