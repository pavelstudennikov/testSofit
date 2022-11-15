import Image from 'next/image'
import { useEffect, useRef } from "react";

const myLoader = ({ src, width, quality }) => src

export const ImagesComp = ({ item, visibleMeta }) => {
    const canvasRef = useRef(null);

    const width = 760
    const height = 635
    const { dirName, image } = item

    useEffect(() => {
        const { points } = item

        if (canvasRef.current) {


            const { vehicle_region, plate, detection_state }  = points[0]

            const { lb, lt, rb, rt } = vehicle_region
            const { region, center } = plate

            const ctx = canvasRef.current.getContext("2d");


            ctx.moveTo(width * lb.x, height * lb.y);
            ctx.lineTo(width * lt.x, height * lt.y);
            ctx.lineTo(width * rt.x, height * rt.y);
            ctx.lineTo(width * rb.x, height * rb.y);
            ctx.lineTo(width * lb.x, height * lb.y);
            ctx.stroke();

            ctx.moveTo(width * region.lb.x, height * region.lb.y);
            ctx.lineTo(width * region.lt.x, height * region.lt.y);
            ctx.lineTo(width * region.rt.x, height * region.rt.y);
            ctx.lineTo(width * region.rb.x, height * region.rb.y);
            ctx.closePath();
            ctx.stroke();

            ctx.moveTo(center.x, center.y);
            ctx.lineTo(center.x+1, center.y+1);
            ctx.closePath();
            ctx.stroke();

            ctx.fillStyle = "white";
            ctx.font = "bold 18px Arial";
            ctx.fillText(detection_state.timestamp, width - 230, height - 50);

            ctx.strokeStyle = "red";
            ctx.stroke();
        }

        canvasRef.current = null

    }, [visibleMeta, item ]);




    return  <div style={{ margin: 20, width, height, position: 'relative'}}>
        <Image
            loader={myLoader}
            src={`../../../Archive/${dirName}/${image}`}
            alt="Picture of the author"
            width={width}
            height={height}

            style={{  position: 'absolute',top: 0,left: 0  }}
        />
        {visibleMeta && <canvas
            // style={{ }}
            ref={canvasRef}
            width={width}
            height={height}
            style={{position: 'absolute', top: 0, left: 0, zIndex: 100}}
        />}
    </div>
}
