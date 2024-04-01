function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 53345;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 53345 > /dev/null;
done;

for child in $(list_child_processes 53367);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/juliusdalsgaardbertelsen/Documents/ITU/WasteIT/WasteManagement_IBM/src/bin/Debug/net7.0/ea3acd7e7f4d41ceaf1a8f0608d8f5ed.sh;
