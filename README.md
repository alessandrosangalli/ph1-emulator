<h1><strong> Emulador-PH1 </strong> </h1>
    <h2> Trabalho de Arquitetura e Organização de Computadores I, ministrada pelo Prof. Me. Marcos Jose Brusso, pela Universidade de Passo Fundo - UPF </h2>
    <h5><strong>Nome:</strong> Alessandro A. Sangalli</h5> <h5><strong>Matrícula: 158095</strong> </h5>
    <h5><strong>Nome:</strong> William S. Nepomuceno</h5> <h5><strong>Matrícula: 178344</strong> </h5>
    <ul>
<hr>

<li><h3>Compilação e Execução</h3></li>

<p>Para compilação é necessário ter instalado o node.js e npm</p>
<p>Para execução executar o comando npm install dentro da pasta com o código. Após abrir o projeto no Visual Studio Code e iniciar o programa, presionando F5(Visual Studio Code)</p>

<li><h3>Entrada</h3></li>

<p>Ao iniciar o programa será necessário informar o nome do arquivo, que deve ser em formato .txt, cada linha do arquivo contem o endereço de memória PH1 e seu valor
   ambos devem estar em Hexadecimal separados por um espaço em branco</p>
<ul>
    <li><h4><strong>Exemplo de entrada (arquivo "entrada01.txt")</strong></h4></li>
    00 10<br>
    01 81<br>
    02 30<br>
    03 82<br>
    04 20<br>
    05 80<br>
    06 F0<br>
    80 00<br>
    81 05<br>
    82 02<br>
</ul>

<hr>

<li><h3>Saída</h3></li>
<p>A saída do programa deve conter o seguinte formato:</p>
  Input file: entrada01.txt<br>

  LDR 81 ; AC <- MEM[81]<br>
  ADD 82 ; AC <- AC + MEM[82]<br>
  STR 80 ; MEM[80] <- AC<br>
  HLT<br>

  4 instructions executed<br>

  Registers:<br>
  AC 07<br>
  PC 07<br>

  Memory:<br>
  80 07<br>
</p>

</ul>
<hr>