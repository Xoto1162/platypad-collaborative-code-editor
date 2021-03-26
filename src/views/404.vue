<template lang="pug">
    .container
        span.numer 4
        .circle
            .drops
            .drops
            .hand
            .hand.rgt
            .holder
                .bob
                    .nose
                    .face
                        .mouth
                            .tongue
                    .ear
                    .ear.rgt
                    .neck

        span.numer 4
</template>

<script>
export default {
    name: '404',
}
</script>

<style lang="scss">
    $skin : #fdd5b6;
    $strk : #602f2d;
    $bw   : 3px;
    *, *:after, *:before{
        box-sizing: border-box;
    }
    body{
        text-align: center;
        background: #1e1e1e;
        background: #1e1e1e;
    }


    .container{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50% , -50%);
    }


    .circle{
        border-radius:50%;
        padding: 0;
        display: inline-block;
        position: relative;
        height: 375px;
        &:after{
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border: 40px solid #fffbdf;
            z-index: 50;
            border-radius:50%;
        }
    }
    .holder{
        overflow: hidden;
        width: 366px;
        height: 345px;
        border-radius:50%;
        position: relative;
    }

    .bob{
        position: absolute;
        display: inline-block;
        left: 50%;
        z-index: 10;
        transform: translateX(-50%);
        animation: 2s updown ease-in infinite;
        top:100%;
        .nose{
            position: relative;
            background: $skin;
            border:$bw solid $strk;
            margin: 0 auto;
            height: 35px;
            width: 35px;
            z-index: 15;
            border-radius: 50% 50% 0 0;
            top: 8px;

            &:after{
                content: '';
                position: absolute;
                left: 5px;
                top: 12px;
                height: 7px;
                width: 7px;
                border-radius: 50%;
                background: $strk;
                box-shadow:13px 0 $strk;
            }
        }

        .face{
            width: 200px;
            height: 200px;
            background: $skin;
            border:$bw solid $strk ;
            border-radius: 50%;
            position: relative;
            z-index: 50;
            box-shadow: 15px 0 #f7c6a4 inset;
        }

        .ear{
            position: absolute;
            background: $skin;
            border:$bw solid $strk;
            width: 40px;
            height: 40px;
            border-radius:50%;
            z-index: 15;
            top: 115px;
            left: -5px;
            &:after, &:before{
                content: '';
                position: absolute;
                background: $strk;
                border-radius: 15px;
                height: 3px;
                width: 20px;
                top: 12px;
                left: 5px;

            }
            &:after{
                transform: rotate(127deg);
                width: 7px;
                top: 15px;
                left: 7px;
            }

            &.rgt{
                left: auto;
                right: -5px;
                &:after{
                    tranform: rotate(47deg);
                    top: 15px;
                    left: 18px;
                }
            }
        }

        .neck{
            position: relative;
            background: $skin;
            border:$bw solid $strk;
            margin: 0 auto 0;
            height: 50px;
            width: 70px;
            z-index: 15;
            border-radius: 0 0 50% 50% ;
            top: -8px;
            box-shadow: 10px 0 #f7c6a4 inset;
        }

        .mouth{
            position: absolute;
            border:$bw solid $strk;
            background: #ec7374;
            width: 80%;
            height: 80%;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            border-radius: 50%;
            overflow: hidden;
            animation: 1s openclose ease-in infinite;

            &:after, &:before{
                content: '';
                position: absolute;
                background:#cc5e64;
                border: 5px solid #df6062;
                border-radius:50%;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                width: 120px;
                height: 120px;
                z-index: 2;
            }
            &:after{
                z-index: 10;
                bottom: auto;
                top: 25px;
                background: #ec7374;
                height: 40px;
                width: 40px;
                border-top-color: transparent;
            }
        }

        .tongue{
            position: absolute;
            background: $strk;
            width: 40px;
            height: 40px;
            left: 0;
            bottom: 5px;
            right: 0;
            margin: auto;
            border-radius: 50%;
            z-index: 5;
            &:after, &:before{
                content: '';
                position: absolute;
                background: #f9adba;
                border: $bw solid $strk;
                border-radius:50px;
                top: 22px;
                left: -4px;
                width: 30px;
                height: 40px;
                z-index: 2;
            }
            &:before{
                left: 16px;
            }

        }
    }

    .drops{
        background: #8ecbf9;
        border: 2px solid $strk;
        width: 20px;
        height: 20px;
        border-radius: 50px 50px 0 50px;
        position: absolute;
        transform: rotate(-15deg);
        top: 150px;
        left: 70px;
        z-index: 100;
        animation: 2s drop-l ease-in infinite;

        &:nth-child(2){
            left: auto;
            right: 70px;
            transform: rotate(145deg);
            animation: 2s drop-r ease-in infinite;
        }

        &:after, &:before{
            content: '';
            background: #8ecbf9;
            border: 2px solid $strk;
            width: 20px;
            height: 20px;
            border-radius: 50px 50px 0 50px;
            position: absolute;
            transform: rotate(-15deg);
            top: 20px;
            left: -25px;
        }
        &:before{
            top: -30px;
            left: 0px;
        }
    }
    .hand{
        border:$bw solid $strk;
        position: absolute;
        z-index: 50;
        background: #fdd5b6;
        width: 25px;
        height: 15px;
        border-radius: 20px;
        bottom: 86px;
        z-index: 200;
        left: 64px;
        transform: rotate(-36deg);

        &:after, &:before{
            content: '';
            border:$bw solid $strk;
            position: absolute;
            z-index: 50;
            background: #fdd5b6;
            width: 25px;
            height: 15px;
            border-radius: 20px;
            z-index: 200;
            top: 100%;
            left: 0;
        }
        &:before{
            top: 200%;
        }
    }
    .rgt{
        left: auto;
        right: 60px;
        bottom: 96px;
        transform: rotate(50deg);
    }

    .numer{
        font-size: 500px;
        display: inline-block;
        color: #fffbdf;
    }

    @keyframes updown {
        50% , 70% {top:25%}
    }
    @keyframes openclose {
        0% , 100%{transform: scale(0.95)}
        50%{transform: scale(1.1)}
    }

    @keyframes drop-l {
        0% , 50% {opacity: 0; transform: ( translate(50px, 0) rotate(-15deg) )}
        55%{opacity: 1; transform: ( translate(0, 0) rotate(-15deg) )}
        70%{opacity: 1; transform: ( translate(-30px, 0) rotate(-25deg) )}
        85%{opacity: 1; transform: ( translate(-50px, 100px) rotate(-90deg)); opacity: .5;}
        86% , 100%{opacity: 0;}

    }
    @keyframes drop-r {
        0% , 50% {opacity: 0; transform: ( translate(-50px, 0) rotate(145deg))}
        55%{opacity: 1; transform: ( translate(0, 0) rotate(145deg) )}
        70%{opacity: 1; transform: ( translate(30px, 0) rotate(160deg) )}
        85%{opacity: 1; transform: ( translate(50px, 100px) rotate(180deg)); opacity: .5;}
        86% , 100%{opacity: 0;}

    }
</style>