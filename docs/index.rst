.. -*- coding: utf-8; -*-

===============================================================================================
JAWS DAYS 2016 - HackDay / SORACOM Air+AWS IoTでデータ可視化 〜OpenBlocks IoTハンズオン初級編〜
===============================================================================================

本ドキュメントは2016/3/12(sat)に開催された `JAWS DAYS 2016 <http://jawsdays2016.jaws-ug.jp/>`_ 内のハンズオントラック "HackDay" 用のテキストです

Auhtor: `Kohei MATSUSHITA <https://twitter.com/ma2shita>`_

概要
====

OpenBlocks IoT BX1 (以下 BX1) を使用し、富士通コンポーネント社製 温度・加速度センサーデバイス "FWM8BLZ02" のデータを "SORACOM Air" の回線で "AWS IoT" に送信し、Amazon Elasticsearch Service(以下 Amazon ES)上のKibanaでグラフ化するところまでを解説します


.. toctree::
   :hidden:
   :maxdepth: 2
   :numbered:

   00
   01
   02
   03
   04
   05
   06
   07

:doc:`00` へ進む

時間配分
~~~~~~~~

#. [30m] BX1のWi-Fi AP設定とSORACOM Air(3Gネットワーク)設定
#. [15m] センサーとBX1の接続
#. [10m] Amazon ESのインスタンス作成と設定
#. [20m] AWS LambdaのLambda function作成
#. [30m] AWS IoTの設定
#. [30m] BX1とAWS IoTの接続
#. [15m] あとかたづけ

